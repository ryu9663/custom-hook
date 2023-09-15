# 커스텀 훅 모음집

- useWindowSize : 브라우저 사이즈

```
const {width,height} = useWindowSize()
```

- useCurrentPosition : 현재 위치 받아오기

```
const {loading,position} = useCurrentPosition()
```

- useToast : 토스트 띄우기

```
const { showToast } = useToast();
...
//showToast(type: boolean, string: string, time: number)
//type : 긍정 or 부정 , string : 내용, time : n초 이따 사라짐
<button onClick={() => showToast(false, "bye", 1000)}>토스트 빨강</button>
```

- useKakaoMap : 카카오맵api에 사용

```

const mapRef = useRef(null);

const { map } = useMap(mapRef, otherMarkers,currentPosition);


return <article ref={mapRef} className={styles.map} id={styles.map}></article>

```

- useQuery : swagger에서 generate된 api call 메서드와 연동(이 레포지토리에 swagger관련된건 .gitignore에 있음)
