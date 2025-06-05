import { useEffect, useState } from 'react';
import { GeolocationService } from '../services/GeolocationService';

export type GeolocationStatus = 'idle' | 'loading' | 'success' | 'error';

export function useGeolocation() {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [status, setStatus] = useState<GeolocationStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setStatus('loading');
    GeolocationService.getCurrentPosition()
      .then((pos) => {
        setPosition(pos);
        setStatus('success');
      })
      .catch((err) => {
        setError(err?.message || '위치 정보를 가져오지 못했습니다.');
        setStatus('error');
      });
  }, []);

  const refresh = () => {
    GeolocationService.clearCache();
    setStatus('loading');
    setError(null);
    GeolocationService.getCurrentPosition()
      .then((pos) => {
        setPosition(pos);
        setStatus('success');
      })
      .catch((err) => {
        setError(err?.message || '위치 정보를 가져오지 못했습니다.');
        setStatus('error');
      });
  };

  return { position, status, error, refresh };
} 