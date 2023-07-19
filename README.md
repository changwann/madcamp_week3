<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
  </a>

  <h1 align="center">🗺️ KAIST MAP Project</h1>

  <p align="center">
    KAIST 2023 여름 몰입캠프 3주차 과제 (2분반 김창완, 김현서)  
  <br />
  <br />
  <br />
  </p>
</div>

## :pushpin: 몰입캠프 3주차 과제 (자유주제)

불편한 점: 팀원 두 명 다 타대학교에서 카이스트 학점교류를 왔고, 처음 왔을 때 편의시설이 어딨는지 몰라서 불편했다.  
카이스트 캠퍼스 내 편의시설(식당) 정보를 위치와 함께 한눈에 편하게 살필 수 있고, 커뮤니티 기능까지 넣은 지도 웹 서비스 만들기

## 📌 업로드 파일 실행하기

1. npm install
2. npm run build
3. serve -s build -l 80
4. node server.js


## :pushpin: 개발 환경

Frontend: HTML, CSS, JavaScript(JSX)  
Backend: Node.js (express)  
DataBase: MongoDB (mongoose)  
IDE: VScode

## :pushpin: 역할 분담

- 공통: 지도 레이아웃 구축 및 React 컴포넌트 분리
- 김창완: 실시간채팅 기능, 메뉴 웹 스크래핑 기능   
- 김현서: 리뷰글쓰기, 별점 기능


## :pushpin: 서비스 설명
![캡처](https://github.com/changwann/madcamp_week3/assets/122224659/c0bb72d0-c217-4b10-826d-8f95b2541b7f)  
서비스의 홈 화면이다. 카카오톡 로그인 서비스를 제공한다.

![캡처2](https://github.com/changwann/madcamp_week3/assets/122224659/93f21a80-5bc4-4443-bdf8-76f6e396f36d)  
카카오톡 아이디와 비밀번호를 알맞게 입력하면, 유저 정보 중 이름을 가져온다.

![캡처3](https://github.com/changwann/madcamp_week3/assets/122224659/adef2519-2cf0-4229-97f7-456913ec489b)    
정상적으로 로그인이 되면 화면이 양쪽으로 분할되며, 왼쪽은 상세정보 탭이 뜨고 오른쪽은 지도 탭이 뜨게 된다.    
처음 시작하거나, 마커가 아닌 지도의 부분을 누르면 다음과 같이 카이스트에 온 걸 환영한다는 문구가 뜬다.  

![캡처4](https://github.com/changwann/madcamp_week3/assets/122224659/d4bc9f4e-c260-44a0-a95d-88ba0379ecd7)  
마커를 클릭하게 되면, 해당 장소의 정보가 왼쪽 탭에 뜨게 된다.  
왼쪽 탭의 하위 탭으로는 메뉴, 리뷰, 채팅 탭이 존재한다.  
홈페이지 바로가기 버튼을 누를 경우, 관련 링크 페이지 창을 띄워준다.  

![캡처5](https://github.com/changwann/madcamp_week3/assets/122224659/1e06c05f-0403-4bdd-9ec7-6dcc1de5309a)  
메뉴탭 같은 경우, 식당을 두 가지로 나누어 개발했다.  
- 매일 메뉴가 바뀌는 식당 (ex. 학생식당)  
웹 스크래핑을 이용해 매일 바뀌는 메뉴 정보를 가져오도록 했다. 실제로 매일 메뉴가 홈페이지 정보에 맞게 업데이트 된다.  
- 메뉴가 정해져 있는 식당 (ex. 롯데리아)  
고정 메뉴를 식당 정보에 함께 넣었다.

![캡처6](https://github.com/changwann/madcamp_week3/assets/122224659/569b6323-ffdf-493f-92c0-b5a451f0537d)
리뷰탭 같은 경우, 리뷰 작성 버튼을 누르면 리뷰를 작성할 수 있는 칸이 뜬다. 장소마다 리뷰를 따로 관리한다.  

![캡처7](https://github.com/changwann/madcamp_week3/assets/122224659/cdc2a466-0783-49ee-b512-12051d38db42)
0~5점 사이의 평점과 함께 텍스트를 리뷰로 작성할 수 있다.  

![캡처9](https://github.com/changwann/madcamp_week3/assets/122224659/6d504b66-f559-492f-83ce-64230ef5ed47)
리뷰는 데이터베이스에 보관하기 때문에, 남이 쓴 리뷰도 볼 수 있고 전체 평점으로 평균 평점을 대표값으로 보여준다.  

![캡처8](https://github.com/changwann/madcamp_week3/assets/122224659/73d7e40a-5ba9-461d-85e2-a57afb90b179)  
채팅탭 같은 경우, 장소마다 따로 관리가 되며 카카오톡의 단체채팅방 기능과 비슷하게 구현했다.  

![캡처10](https://github.com/changwann/madcamp_week3/assets/122224659/320af05a-64a2-447c-970f-efdca207ce6f)  
Web Socket 개념을 활용하여 페이지를 새로고침하지 않아도 실시간으로 채팅이 업데이트되며, 상대방의 이름과 작성 시간이 채팅과 함께 뜨게 된다.  


## 📌 기대효과

사용자들이 카이스트 내 식당 정보와 위치를 한눈에 살필 수 있고, 식당마다 채팅 기능을 활용해 밥 먹을 사람이나 식당의 추가적인 정보(사람이 많은지 등)을 알 수 있을 것이다.

## :pushpin: 느낀 점

김창완: 클라이언트와 서버 구조를 포트 설정과 관련하여 지금까지 잘못 이해할 수 있었고, 웹 스크래핑과 웹 소켓 등 새로운 개념을 공부할 수 있어서 의미 있었다. 무엇보다 구현에 급급하기보단 이번 주는 공부와 이해 위주로 프로젝트를 진행해서 가장 성장에 도움된 거 같다. 리액트도 처음 써보며 컴포넌트마다 분업을 하는 걸 배웠다. 아쉬운 점은 기능 구현에 집중하다보니 디자인 쪽에 시간을 쏟지 못했고, 데이터베이스에 모든 장소 데이터를 넣는 게 이상적이나 하드코딩을 했다는 점이 아쉽다.

김현서: *

## :pushpin: 팀원 연락처

김창완 GIST - changwan@gm.gist.ac.kr  
김현서 SKKU - *
