import React, { useEffect, useRef, useState } from "react";

import Kaistmaru from "./assets/kaistmaru.jpeg";
import Lotteria from "./assets/lotteria.jpg";
import Taeul from "./assets/taeul.jpg";
import Neopjuk from "./assets/neopjuk.jpg";

import CommentSection from "./CommentSection";

const KakaoMap = () => {
  const mapContainer = useRef(null);
  const [info, setInfo] = useState(
    "카이스트에 오신 걸 환영합니다!\n원하는 편의 시설을 클릭해서\n둘러보세요."
  );
  const [image, setImage] = useState(Neopjuk);
  const [des, setDes] = useState(null);
  const [comments, setComments] = useState({});
  const [place, setPlace] = useState(null);
  const [link, setLink] = useState(null);

  const [isMarkerClicked, setIsMarkerClicked] = useState(false);

  const addComment = (placeName, comment) => {
    setComments((prevComments) => ({
      ...prevComments,
      [placeName]: [...(prevComments[placeName] || []), comment],
    }));
  };
  // eslint-disable-next-line
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
          window.kakao.maps.event.addListener(map, "click", function () {
            if (!isMarkerClicked) {
              setInfo(
                "카이스트에 오신 걸 환영합니다!\n원하는 편의 시설을 클릭해서\n둘러보세요."
              );
              setImage(Neopjuk);
              setDes(null);
              setPlace(null);
              setLink(null);
            } else {
              setIsMarkerClicked(false);
            }
          });

          const places = [
            {
              name: "카이마루",
              lat: 36.373783248192396,
              lng: 127.35924359581102,
              image: Kaistmaru,
              des: "[매일]\n조식 8:00-9:00\n중식 11:30-13:30\n석식 17:30-19:00",
              link: "https://www.kaist.ac.kr/kr/html/campus/053001.html?dvs_cd=fclt",
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
          ];

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
              setIsMarkerClicked(true);
              setInfo(`${place.name}`);
              setImage(place.image);
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
          overflow: "auto",
        }}
      >
        {image && (
          <img
            src={image}
            alt={info}
            style={{ width: "100%", height: "auto" }}
          />
        )}
        {info && (
          <p
            dangerouslySetInnerHTML={{ __html: info.replace(/\n/g, "<br />") }}
            style={{ fontSize: "40px" }}
          />
        )}
        {link && (
          <button onClick={() => window.open(`${link}`, "_blank")}>
            홈페이지 바로가기
          </button>
        )}
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
