import React, { useEffect, useRef, useState } from "react";

import Kaistmaru from "./assets/kaistmaru.jpeg";
import Lotteria from "./assets/lotteria.jpg";
import Taeul from "./assets/taeul.jpg";
import Neopjuk from "./assets/neopjuk.jpg";
import N1building from "./assets/N1buliding.jpg";
import N6 from "./assets/N6.jpg";
import Tom from "./assets/tom.jpg";
import Pulbitmaru from "./assets/pulbitmaru.jpg";
import Subway from "./assets/subway.jpg";

import Tabs from "./Tabs";

const KakaoMap = ({ userName }) => {
  const mapContainer = useRef(null);
  const [info, setInfo] = useState(
    "카이스트에 오신 걸 환영합니다!\n원하는 편의 시설을 클릭해서\n둘러보세요."
  );
  const [image, setImage] = useState(Neopjuk);
  const [des, setDes] = useState(null);
  const [place, setPlace] = useState(null);
  const [link, setLink] = useState(null);
  const [menu, setMenu] = useState(null);

  const [isMarkerClicked, setIsMarkerClicked] = useState(false);

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
              setMenu(null);
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
              menu: "매일 바뀜",
            },
            {
              name: "태울관",
              lat: 36.37306446971584,
              lng: 127.3600231283904,
              image: Taeul,
              des: "[평일]\n10:30-20:30\n(라스트 오더 20:00, 브레이크 타임 14:30-16:30)\n\n[주말 및 공휴일]\n휴무",
              link: "https://www.kaist.ac.kr/kr/html/campus/053001.html?dvs_cd=taeul_cafe",
              menu: "제육볶음, 순두부찌개, 설렁탕, 냉면, 만두 등",
            },
            {
              name: "롯데리아",
              lat: 36.373101189522224,
              lng: 127.36054704682378,
              image: Lotteria,
              des: "[매일]\n08:00-03:00",
              link: "https://www.lotteeatz.com/brand/ria",
              menu: "햄버거, 치킨, 감자튀김, 콜라, 아이스크림 등",
            },
            {
              name: "IT융합빌딩 (실습실)",
              lat: 36.374205180261505,
              lng: 127.36571727296767,
              image: N1building,
              des: "[매일]\n00:00-24:00",
              link: "https://student.kaist.ac.kr/wiki/%EA%B9%80%EB%B3%91%ED%98%B8%C2%B7%EA%B9%80%EC%82%BC%EC%97%B4_IT%EC%9C%B5%ED%95%A9%EB%B9%8C%EB%94%A9",
              menu: "음식점이 아님",
            },
            {
              name: "교수회관",
              lat: 36.37459106871984,
              lng: 127.36477185541334,
              image: N6,
              des: "[매일]\n중식 11:20-13:30 석식 17:30-18:30",
              link: "https://www.kaist.ac.kr/kr/html/campus/053001.html?dvs_cd=emp",
              menu: "매일 바뀜",
            },
            {
              name: "탐앤탐스",
              lat: 36.37411159854939,
              lng: 127.36537695074817,
              image: Tom,
              des: "[평일] 7:00-22:00\n[주말, 방학] 10:00-21:00\n[공휴일] 10:00-17:00",
              link: "https://www.kaist.ac.kr/kr/html/campus/053001.html?dvs_cd=emp",
              menu: "커피, 음료, 티, 스무디, 프레즐, 피자, 베이커리 등",
            },
            {
              name: "풀빛마루",
              lat: 36.37421407766052,
              lng: 127.35981948048043,
              image: Pulbitmaru,
              des: "[평일] 7:00-22:00\n[주말, 방학] 10:00-21:00\n[공휴일] 10:00-17:00",
              link: "https://www.kaist.ac.kr/kr/html/campus/053001.html?dvs_cd=emp",
              menu: "커피, 음료, 티, 스무디, 프레즐, 피자, 베이커리 등",
            },
            {
              name: "서브웨이",
              lat: 36.37170696429745,
              lng: 127.36192518067469,
              image: Subway,
              des: "[매일] 08:00 ~ 23:00",
              menu: "샌드위치, 커피, 음료, 쿠키, 샐러드 등",
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
              setPlace(place);
              setLink(place.link);
              setMenu(place.menu);
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
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        textAlign: "center",
      }}
    >
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

        <Tabs place={place} userName={userName} />
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
