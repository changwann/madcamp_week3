import React, { useEffect, useRef, useState } from "react";
import Kaistmaru from "./assets/kaistmaru.jpeg";
import Lotteria from "./assets/lotteria.jpg";
import Taeul from "./assets/taeul.jpg";
import CommentSection from "./CommentSection";

const KakaoMap = () => {
  const mapContainer = useRef(null);
  const [info, setInfo] = useState(null);
  const [image, setImage] = useState(null); // 이미지를 저장할 state를 생성
  const [des, setDes] = useState(null);
  const [comments, setComments] = useState({});
  const [place, setPlace] = useState(null);
  const [link, setLink] = useState(null);

  const addComment = (placeName, comment) => {
    setComments((prevComments) => ({
      ...prevComments,
      [placeName]: [...(prevComments[placeName] || []), comment],
    }));
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const lat = position.coords.latitude,
            lon = position.coords.longitude;

          const options = {
            center: new window.kakao.maps.LatLng(lat, lon),
            level: 3,
          };

          const map = new window.kakao.maps.Map(mapContainer.current, options);

          // 장소에 대한 정보를 저장하고 있는 배열
          const places = [
            {
              name: "카이마루",
              lat: 36.373783248192396,
              lng: 127.35924359581102,
              image: Kaistmaru,
              des: "[매일]\n조식 8:00-9:00\n중식 11:30-13:30\n석식 17:30-19:00",
              link: "https://www.kaist.ac.kr/kr/html/campus/053001.html?",
            },
            {
              name: "태울관",
              lat: 36.37306446971584,
              lng: 127.3600231283904,
              image: Taeul,
              des: "[평일]\n10:30-20:30\n(라스트 오더 20:00, 브레이크 타임 14:30-16:30)\n\n[주말 및 공휴일]\n휴무",
              link: "https://www.kaist.ac.kr/kr/html/campus/053001.html?dvs_cd=taeul_cafe",
            },
            {
              name: "롯데리아",
              lat: 36.373101189522224,
              lng: 127.36054704682378,
              image: Lotteria,
              des: "[매일]\n08:00-03:00",
              link: "https://www.lotteeatz.com/brand/ria",
            },
            // 필요한 만큼 장소를 추가할 수 있습니다.
          ];

          // 배열을 순회하면서 각각의 장소에 마커를 추가하고 이벤트를 등록
          places.forEach((place) => {
            const markerPosition = new window.kakao.maps.LatLng(
              place.lat,
              place.lng
            );
            const marker = new window.kakao.maps.Marker({
              position: markerPosition,
            });
            marker.setMap(map);

            window.kakao.maps.event.addListener(marker, "click", function () {
              setInfo(`${place.name}`); // click event
              setImage(place.image); // 마커를 클릭할 때 이미지를 변경
              setDes(place.des);
              setPlace(place.name);
              setLink(place.link);
            });
          });
        },
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      alert("GPS를 지원하지 않습니다");
    }
  }, []);

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh" }}>
      <div
        id="infoPanel"
        style={{
          width: "25vw",
          height: "100vh",
          backgroundColor: "#f8f9fa",
          //padding: "1rem",
          overflow: "auto",
        }}
      >
        {image && (
          <img
            src={image}
            alt={info}
            style={{ width: "100%", height: "auto" }}
          />
        )}{" "}
        <p style={{ fontSize: "40px" }}>{info}</p>
        <button onClick={() => window.open(`${link}`, "_blank")}>
          홈페이지 바로가기
        </button>
        {des && (
          <p
            dangerouslySetInnerHTML={{ __html: des.replace(/\n/g, "<br />") }}
          />
        )}
        {place && (
          <CommentSection
            comments={comments[place] || []}
            onNewComment={(comment) => addComment(place, comment)}
          />
        )}
      </div>
      <div
        id="myMap"
        style={{ width: "75vw", height: "100vh" }}
        ref={mapContainer}
      ></div>
    </div>
  );
};

export default KakaoMap;
