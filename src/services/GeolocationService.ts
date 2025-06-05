// src/services/GeolocationService.ts

type Position = { lat: number; lng: number };

const DEFAULT_POSITION: Position = {
  lat: 37.5665, // 서울시청 위도
  lng: 126.9780 // 서울시청 경도
};

const CACHE_KEY = 'user_location';
const CACHE_DURATION = 5 * 60 * 1000; // 5분

export class GeolocationService {
  // 위치 정보 캐싱
  static getCachedPosition(): Position | null {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    try {
      const { position, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_DURATION) {
        return position;
      }
      return null;
    } catch {
      return null;
    }
  }

  static setCachedPosition(position: Position) {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ position, timestamp: Date.now() })
    );
  }

  // 현재 위치 요청 (권한/오류/폴백 처리)
  static getCurrentPosition(): Promise<Position> {
    return new Promise((resolve, reject) => {
      // HTTPS 환경 체크
      if (window.location.protocol !== 'https:') {
        resolve(this.getDefaultPosition());
        return;
      }

      // 캐시 우선 반환
      const cached = this.getCachedPosition();
      if (cached) {
        resolve(cached);
        return;
      }

      if (!navigator.geolocation) {
        resolve(this.getDefaultPosition());
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const position = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
          this.setCachedPosition(position);
          resolve(position);
        },
        (err) => {
          resolve(this.getDefaultPosition());
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  }

  // 기본 위치 반환 (예: 서울시청)
  static getDefaultPosition(): Position {
    return DEFAULT_POSITION;
  }

  // (옵션) 캐시 삭제
  static clearCache() {
    localStorage.removeItem(CACHE_KEY);
  }
}