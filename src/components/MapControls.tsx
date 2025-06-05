import React from 'react';
import { useMap } from '../context/MapContext';
import { GeolocationService } from '../services/GeolocationService';

const MapControls: React.FC = () => {
  const { map } = useMap();

  const handleZoomIn = () => {
    if (map) map.setLevel(map.getLevel() - 1);
  };
  const handleZoomOut = () => {
    if (map) map.setLevel(map.getLevel() + 1);
  };
  const handleMoveToCurrent = async () => {
    if (!map) return;
    const pos = await GeolocationService.getCurrentPosition();
    const center = new window.kakao.maps.LatLng(pos.lat, pos.lng);
    map.panTo(center);
  };

  return (
    <div className="flex gap-2 absolute top-6 right-6 z-10">
      <button
        className="px-3 py-2 bg-white border rounded shadow hover:bg-blue-100"
        onClick={handleZoomIn}
        disabled={!map}
      >
        +
      </button>
      <button
        className="px-3 py-2 bg-white border rounded shadow hover:bg-blue-100"
        onClick={handleZoomOut}
        disabled={!map}
      >
        -
      </button>
      <button
        className="px-3 py-2 bg-white border rounded shadow hover:bg-green-100"
        onClick={handleMoveToCurrent}
        disabled={!map}
      >
        내 위치로 이동
      </button>
    </div>
  );
};

export default MapControls; 