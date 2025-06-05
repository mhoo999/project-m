// src/pages/RangeSettingPage.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import KakaoMap from "../components/KakaoMap";

export default function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="w-full mx-auto min-h-screen bg-white flex flex-col p-0">
      {/* FoodPin 로고 */}
      <div className="px-6 pt-8 pb-2">
        <div className="text-2xl font-bold text-gray-900">FoodPin</div>
      </div>

      {/* 검색 입력창 */}
      <div className="px-6">
        <input
          className="w-full h-10 rounded bg-gray-100 px-4 text-gray-400 text-base mb-4 cursor-pointer"
          placeholder="지역을 검색해보세요"
          readOnly
          onClick={() => navigate('/search', { state: { backgroundLocation: location } })}
        />
      </div>

      {/* 지도 영역 */}
      <div className="mx-4">
        <KakaoMap lat={37.501274} lng={127.039585} radius={500} />
      </div>

      {/* 주소 */}
      <div className="px-6">
        <div className="text-xs text-gray-400 mb-1">주소</div>
        <div className="text-sm text-gray-800 font-medium mb-2">
          서울특별시 서초구 강남대로 465 교보타워 10층
        </div>
      </div>

      {/* 거리 */}
      <div className="px-6">
        <div className="flex items-center mb-2">
          <span className="text-sm font-bold text-gray-800 mr-2">거리</span>
          <span className="text-sm text-gray-800">500m</span>
        </div>
        <input
          type="range"
          min={100}
          max={2000}
          value={500}
          className="w-full accent-red-500"
          readOnly
        />
      </div>

      {/* TIP */}
      <div className="px-6 mt-2 mb-4">
        <div className="text-xs text-sky-500">
          TIP <span className="font-normal text-gray-500">소요를 위해 약 10분 정도 걷는 것을 추천해요.</span>
        </div>
      </div>

      {/* 완료 버튼 */}
      <button className="mt-auto m-6 h-14 rounded-lg bg-red-500 text-white font-bold text-lg shadow"
        onClick={() => navigate('/stores')}
      >
        검색
      </button>
    </div>
  );
}