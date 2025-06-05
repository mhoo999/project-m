const KAKAO_MAP_KEY = import.meta.env.VITE_KAKAO_MAP_KEY;

export function loadKakaoMapScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.getElementById('kakao-map-sdk')) {
      resolve(); // 이미 로드됨
      return;
    }
    const script = document.createElement('script');
    script.id = 'kakao-map-sdk';
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&autoload=false`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('카카오맵 스크립트 로드 실패'));
    document.head.appendChild(script);
  });
} 