import { useEffect, useRef } from "react";
import { addZoomControler, setOtherMarkers } from "./handler";

const useKakaoMap = (
  mapRef: any,
  otherMarkers?: PlaceType[],
  currentPosition?: { lat: number; lon: number }
) => {
  const kakao = window.kakao;
  const kakaoMap = useRef();

  useEffect(() => {
    if (mapRef.current) {
      const container = mapRef.current;
      const center = new kakao.maps.LatLng(
        currentPosition ? currentPosition.lat : 37.1597041,
        currentPosition ? currentPosition.lon : 128.213384
      );
      const option = {
        center,
        level: 8,
      };
      kakaoMap.current = new kakao.maps.Map(container, option);
      addZoomControler(kakaoMap.current);
    }
  }, [mapRef]);
  useEffect(() => {
    if (otherMarkers) setOtherMarkers(kakaoMap.current, otherMarkers);
  }, [otherMarkers]);

  return { map: kakaoMap };
};

export default useKakaoMap;

declare global {
  interface Window {
    kakao: {
      maps: any;
    };
  }
}

//관광공사 api(tourAPI)에서 내려주는 타입
export interface PlaceType {
  addr1: string;
  addr2: string;
  areacode: string;
  booktour: string;
  cat1: string;
  cat2: string;
  cat3: string;
  contentid: string;
  contenttypeid: string;
  createdtime: string;
  dist: string;
  firstimage: string;
  firstimage2: string;
  mapx: string;
  mapy: string;
  mlevel: string;
  modifiedtime: string;
  readcount: string;
  sigungucode: string;
  tel: string;
  title: string;
}
