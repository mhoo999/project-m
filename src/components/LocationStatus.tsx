import React from 'react';
import { useGeolocation } from '../hooks/useGeolocation';

const LocationStatus: React.FC = () => {
  const { position, status, error, refresh } = useGeolocation();

  return (
    <div className="p-4 border rounded bg-white shadow w-full max-w-md mx-auto mt-8">
      <h2 className="text-lg font-bold mb-2">내 위치 정보</h2>
      {status === 'loading' && <p className="text-blue-500">위치 정보를 불러오는 중...</p>}
      {status === 'error' && (
        <div className="text-red-500">
          <p>위치 정보를 가져오지 못했습니다.</p>
          <p>{error}</p>
        </div>
      )}
      {status === 'success' && position && (
        <div className="text-green-700">
          <p>위도: {position.lat}</p>
          <p>경도: {position.lng}</p>
        </div>
      )}
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={refresh}
        disabled={status === 'loading'}
      >
        위치 새로고침
      </button>
    </div>
  );
};

export default LocationStatus; 