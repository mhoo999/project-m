// src/services/GeolocationService.ts
export class GeolocationService {
    static getCurrentPosition(): Promise<{ lat: number; lng: number }> {
      // ...구현 예정
    }
    static getDefaultPosition(): { lat: number; lng: number } {
      // ...구현 예정
    }
    // (옵션) 캐싱, watchPosition 등 추가
  }