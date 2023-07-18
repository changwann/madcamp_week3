//MenuTab.js
import React, { useEffect, useState } from "react";

const MenuTab = ({ place }) => {
  const [menu, setMenu] = useState({ breakfast: "", lunch: "", dinner: "" });

  useEffect(() => {
    if (place.name === "카이마루") {
      fetch("http://localhost:4000/kaistmaru")
        .then((response) => response.json())
        .then((data) => {
          setMenu(data);
        });
    } else if (place.name === "교수회관") {
      fetch("http://localhost:4000/professor")
        .then((response) => response.json())
        .then((data) => {
          setMenu(data);
        });
    } else {
      setMenu({ breakfast: "", lunch: "", dinner: "" });
    }
  }, [place]);
  if (place.name === "카이마루") {
    return (
      <div>
        <h2>오늘의 메뉴 ({new Date().toLocaleDateString("ko-KR")})</h2>
        <small>
          <b>- 알레르기 유발물질 안내 -</b>
          <br></br>
          1.난류 2.우유 3.메밀 4.땅콩 5.대두 6.밀 7.고등어 8.게 9.새우
          10.돼지고기 11.복숭아 <br></br>
          12.토마토 13.아황산류 14.호두 15.닭고기 16.쇠고기 17.오징어 18.조개류
          (굴, 전복, 홍합 포함) 19.잣 <br></br>
        </small>
        <h2>[아침 8:00-9:00]</h2>
        <p
          dangerouslySetInnerHTML={{
            __html: menu.breakfast.trim().replace(/\n/g, "<br />"),
          }}
        />
        <h2>[점심 11:30-13:30]</h2>
        <p
          dangerouslySetInnerHTML={{
            __html: menu.lunch.trim().replace(/\n/g, "<br />"),
          }}
        />
        <h2>[저녁 17:30-19:00]</h2>
        <p
          dangerouslySetInnerHTML={{
            __html: menu.dinner.trim().replace(/\n/g, "<br />"),
          }}
        />
      </div>
    );
  } else if (place.name === "교수회관") {
    return (
      <div>
        <h2>오늘의 메뉴 ({new Date().toLocaleDateString("ko-KR")})</h2>
        <small>
          <b>- 알레르기 유발물질 안내 -</b>
          <br></br>
          1.난류 2.우유 3.메밀 4.땅콩 5.대두 6.밀 7.고등어 8.게 9.새우
          10.돼지고기 11.복숭아 <br></br>
          12.토마토 13.아황산류 14.호두 15.닭고기 16.쇠고기 17.오징어 18.조개류
          (굴, 전복, 홍합 포함) 19.잣 <br></br>
        </small>
        <h2>[점심 11:20-13:30]</h2>
        <p
          dangerouslySetInnerHTML={{
            __html: menu.lunch.trim().replace(/\n/g, "<br />"),
          }}
        />
        <h2>[저녁 17:30-18:30]</h2>
        <p
          dangerouslySetInnerHTML={{
            __html: menu.dinner.trim().replace(/\n/g, "<br />"),
          }}
        />
      </div>
    );
  } else {
    return <h3>{place.menu}</h3>;
  }
};

export default MenuTab;
