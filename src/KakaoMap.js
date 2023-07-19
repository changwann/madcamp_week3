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
import West from "./assets/west.jpg";
import Pizza from "./assets/pizza.jpg";
import Dosirak from "./assets/dosirak.jpg";
import East from "./assets/east.jpg";
import Ogada from "./assets/ogada.jpg";
import Tous from "./assets/tous.jpg";
import Pascucci from "./assets/pascucci.jpg";


import Tabs from "./Tabs";

const KakaoMap = ({ userName }) => {
  const mapContainer = useRef(null);
  const [info, setInfo] = useState(
    userName + "님 반가워요!\n카이스트에 오신 걸 환영합니다!\n원하는 편의 시설을 클릭해서\n둘러보세요."
  );
  const [image, setImage] = useState(Neopjuk);
  const [des, setDes] = useState("34141 대전광역시 유성구 대학로 291 한국과학기술원(KAIST)\nT.042-350-2114 F.042-350-2210(2220)\n\n\nKAIST MAP");
  const [place, setPlace] = useState(null);
  const [link, setLink] = useState("https://www.kaist.ac.kr/kr/");
  const [menu, setMenu] = useState(null);

  const [isMarkerClicked, setIsMarkerClicked] = useState(false);

  // eslint-disable-next-line
  useEffect(() => {
    const options = { center: new window.kakao.maps.LatLng(36.37325922566538, 127.36267063623481), level: 3 };
    const map = new window.kakao.maps.Map(mapContainer.current, options);
    window.kakao.maps.event.addListener(map, "click", function () {
      if (!isMarkerClicked) {
        setInfo(
          userName + "님 반가워요!\n카이스트에 오신 걸 환영합니다!\n원하는 편의 시설을 클릭해서\n둘러보세요."
        );
        setImage(Neopjuk);
        setDes("34141 대전광역시 유성구 대학로 291 한국과학기술원(KAIST)\nT.042-350-2114 F.042-350-2210(2220)\n\n\nKAIST MAP");
        setPlace(null);
        setLink("https://www.kaist.ac.kr/kr/");
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
        menu: "-",
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
        link: "https://www.kaist.ac.kr/kr/html/campus/053305.html",
        menu: "커피, 음료, 티, 스무디, 프레즐, 피자, 베이커리 등",
      },
      {
        name: "풀빛마루",
        lat: 36.37421407766052,
        lng: 127.35981948048043,
        image: Pulbitmaru,
        des: "[평일] 7:00-22:00\n[주말, 방학] 10:00-21:00\n[공휴일] 10:00-17:00",
        link: "https://www.kaist.ac.kr/kr/html/campus/053306.html",
        menu: "브리또, 덮밥, 각종 과일쥬스, 음료 및 차, 요거트\n(무슬림을 위한 할랄 음식 제공)",
      },
      {
        name: "서브웨이",
        lat: 36.37170696429745,
        lng: 127.36192518067469,
        image: Subway,
        des: "[매일] 08:00 ~ 23:00",
        link: "https://www.kaist.ac.kr/kr/html/campus/053306.html",
        menu: "샌드위치, 커피, 음료, 쿠키, 샐러드 등",
      },
      {
        name: "서측 학생식당",
        lat: 36.366894382307514,
        lng: 127.36054069382895,
        image: West,
        des: "-",
        link: "-",
        menu: "-",
      },
      {
        name: "대덕동네 피자",
        lat: 36.367303030824395,
        lng: 127.36099943290702,
        image: Pizza,
        des: "[학기중]\n평일 11:00-19:00 토요일 11:30-18:00\n\n[방학]\n평일 11:30-18:30 토요일 11:30-15:00",
        link: "-",
        menu: "슈프림피자, 야채피자, 페페로니피자, 더블치즈피자, 멕시칸피자",
      },
      {
        name: "더큰도시락",
        lat: 36.36695818624055,
        lng: 127.36030141962031,
        image: Dosirak,
        des: "-",
        link: "-",
        menu: "-",
      },
      {
        name: "동측 학생식당/교직원식당",
        lat: 36.369135370323825,
        lng: 127.36373794125633,
        image: East,
        des: "-",
        link: "-",
        menu: "-",
      },
      {
        name: "오가다",
        lat: 36.368941926390846,
        lng: 127.36289574382371,
        image: Ogada,
        des: "[평일] 9:30-19:30",
        link: "-",
        menu: "블렌딩티, 쥬스, 스무디, 티 라떼, 커피, 팥빙수, 떡, 디저트류 등",
      },
      {
        name: "뚜레쥬르",
        lat: 36.370300322891694,
        lng: 127.36367650496129,
        image: Tous,
        des: "-",
        link: "-",
        menu: "-",
      },
      {
        name: "파스쿠찌",
        lat: 36.368941926390846,
        lng: 127.36472105728215,
        image: Pascucci,
        des: "-",
        link: "-",
        menu: "-",
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
