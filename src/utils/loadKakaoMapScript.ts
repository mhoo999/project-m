const KAKAO_MAP_KEY = import.meta.env.VITE_KAKAO_MAP_KEY;

export function loadKakaoMapScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    // 이미 kakao 객체가 있으면 바로 resolve
    if (window.kakao && window.kakao.maps) {
      resolve();
      return;
    }
    const scriptId = 'kakao-map-sdk';
    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (existingScript) {
      // 이미 script가 있지만 window.kakao가 아직 undefined라면 load 이벤트로 resolve
      existingScript.addEventListener('load', () => resolve());
      return;
    }
    const script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&autoload=false`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('카카오맵 스크립트 로드 실패'));
    document.head.appendChild(script);
  });
} 