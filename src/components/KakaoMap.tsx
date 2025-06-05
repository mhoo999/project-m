import React, { useEffect, useRef, useState } from 'react';
import { loadKakaoMapScript } from '../utils/loadKakaoMapScript';
import { GeolocationService } from '../services/GeolocationService';
import { useMap } from '../context/MapContext';

// 카카오맵 타입 선언 (window.kakao)
declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  radius?: number; // 반경(미터)
  onMapReady?: (map: any) => void; // 지도 인스턴스 콜백
}

const KakaoMap: React.FC<KakaoMapProps> = ({ radius = 1000, onMapReady }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { map } = useMap();

  // 위치 정보 최초 획득
  useEffect(() => {
    GeolocationService.getCurrentPosition()
      .then(setCenter)
      .catch(() => setError('위치 정보를 가져오지 못했습니다.'));
  }, []);

  // 지도 초기화 및 중심 설정
  useEffect(() => {
    if (!center) return;
    let mapInstance: any;
    let circle: any;
    setLoading(true);
    setError(null);
    loadKakaoMapScript()
      .then(() => {
        window.kakao.maps.load(() => {
          if (!mapRef.current) return;
          const options = {
            center: new window.kakao.maps.LatLng(center.lat, center.lng),
            level: 3
          };
          mapInstance = new window.kakao.maps.Map(mapRef.current, options);
          // 반경 원 그리기
          circle = new window.kakao.maps.Circle({
            center: new window.kakao.maps.LatLng(center.lat, center.lng),
            radius: radius,
            strokeWeight: 2,
            strokeColor: '#75B8FA',
            strokeOpacity: 0.8,
            fillColor: '#CFE7FF',
            fillOpacity: 0.3
          });
          circle.setMap(mapInstance);
          setLoading(false);
          if (onMapReady) onMapReady(mapInstance);
        });
      })
      .catch(() => {
        setError('카카오맵 스크립트 로드 실패');
        setLoading(false);
      });
    return () => {
      // cleanup: 지도/원 인스턴스 제거
      if (circle) circle.setMap(null);
      if (mapInstance) mapInstance = null;
    };
  }, [center, radius, onMapReady]);

  // 위치 새로고침 시 지도 중심 부드럽게 이동
  useEffect(() => {
    if (!map || !center) return;
    const kakaoCenter = new window.kakao.maps.LatLng(center.lat, center.lng);
    map.panTo(kakaoCenter);
  }, [center, map]);

  if (error) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-red-100 text-red-600 rounded mt-6">
        {error}
      </div>
    );
  }
  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-200 rounded mt-6 animate-pulse">
        지도를 불러오는 중...
      </div>
    );
  }
  return (
    <div
      ref={mapRef}
      className="w-full h-96 rounded shadow border bg-gray-200 mt-6"
      id="kakao-map-container"
    />
  );
};

export default KakaoMap; 