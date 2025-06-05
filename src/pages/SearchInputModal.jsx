import React, { useState, useRef, useEffect } from "react";

const SUGGESTIONS = ["강남역", "홍대입구", "이태원", "잠실", "건대입구"];

export default function SearchInputModal({ onClose }) {
  const [query, setQuery] = useState("");
  const filtered = SUGGESTIONS.filter((s) => s.includes(query));
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  // 포커스 자동
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    function handleClick(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose?.();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center">
      <div ref={modalRef} className="w-full max-w-[375px] mx-auto bg-white rounded-2xl shadow-lg flex flex-col min-h-[60vh] relative">
        {/* 검색 인풋 */}
        <div className="flex items-center px-4 pt-8 pb-2">
          <input
            ref={inputRef}
            className="flex-1 h-12 rounded-lg bg-gray-100 px-4 text-lg outline-none"
            placeholder="지역, 음식점명 등 검색"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        {/* 자동완성 리스트 */}
        <div className="flex-1 px-4">
          {filtered.length === 0 && (
            <div className="text-gray-400 mt-8 text-center">검색 결과가 없습니다.</div>
          )}
          <ul>
            {filtered.map((item) => (
              <li
                key={item}
                className="py-4 border-b border-gray-100 flex items-center cursor-pointer hover:bg-gray-50"
              >
                <span className="text-base text-gray-800">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 