import React from "react";
import KakaoMap from "../components/KakaoMap";
import { useNavigate } from "react-router-dom";

const STORES = [
  { name: "홍반장 중화요리", type: "중식", rating: 4.7 },
  { name: "김밥천국", type: "한식", rating: 4.3 },
  { name: "스시마을", type: "일식", rating: 4.8 },
];

export default function StoreListPage() {
  const navigate = useNavigate();
  return (
    <div className="w-full mx-auto min-h-screen bg-white flex flex-col relative">
      {/* 지도 영역 */}
      <div className="mx-4 mt-12">
        <KakaoMap lat={37.501274} lng={127.039585} radius={500} />
      </div>
      {/* 가게 리스트 */}
      <div className="flex-1 px-4 mt-4 overflow-y-auto pb-24">
        <ul>
          {STORES.map((store, idx) => (
            <li
              key={store.name}
              className="relative flex items-center bg-gray-50 rounded-xl mb-3 px-4 py-3 shadow-sm"
            >
              {/* 번호 */}
              <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center font-bold mr-3">
                {idx + 1}
              </div>
              {/* 정보 */}
              <div className="flex-1">
                <div className="font-bold text-gray-800">{store.name}</div>
                <div className="text-sm text-gray-500">
                  {store.type} · ★ {store.rating}
                </div>
              </div>
              {/* 외부 열기 아이콘 */}
              <a
                href="#"
                className="ml-2 text-red-500 text-xl"
                title="외부 열기"
              >
                ↗
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* 랜덤추천 버튼 */}
      <button className="absolute top-6 right-6 bg-red-500 text-white px-4 py-2 rounded-lg font-bold shadow z-10">
        랜덤추천
      </button>
      {/* 뒤로가기 버튼 */}
      <button className="absolute top-6 left-6 bg-white w-9 h-9 rounded-full flex items-center justify-center shadow text-xl z-10 text-gray-500"
        onClick={() => navigate(-1)}
      >
        ←
      </button>
    </div>
  );
} 