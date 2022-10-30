# WEB_Mili-Groupbuying-Comm_MiliCo ![badge](https://img.shields.io/badge/license-MIT-blue) ![badge](https://img.shields.io/badge/node-16.17.0-blue)

군인들을 위한 공동구매 커뮤니티
(Cobuying Community for ROK Soldiers)

![Logo](https://raw.githubusercontent.com/osamhack2022/WEB_Mili-Groupbuying-Comm_MiliCo/main/src/assets/img/JJMicon.png)

## 프로젝트 소개 (Introduction)

- 군부대 내에서 장병간 공동구매를 모집하고 참여할 수 있는 node 기반 웹 서비스
  <br/><br/>

## 기능 설명 (Key Features)

1. 인터넷쇼핑 공동구매 / 배달음식 공동배달 / 택시합승 공동모집 등 다양한 **공동구매의 모집** 및 참여
2. 입금 및 상품 수령 등 **공동구매 과정 간편 관리**
3. 공동구매 신뢰성 보장 (속칭 **공구사기 방지**)
   <br/><br/>

## 웹 호환성 (Browser Compatibility)

- ECMAScript 6 지원 브라우저 사용  
  ![badge](https://img.shields.io/badge/chrome-51.0%2B-orange)
  ![badge](https://img.shields.io/badge/ie-15.0%2B-orange)
  ![badge](https://img.shields.io/badge/firefox-54.0%2B-orange)

- 권장: Google Chrome 버젼 77 이상  
  ![badge](https://img.shields.io/badge/chrome-77.0%2B-green)
  <br/><br/>

## 기술 스택 (Technique Used)

### Back-end

- [`node.js`](https://nodejs.org/ko/) + [`Express`](https://expressjs.com/ko/) (WAS + rest api 서버)
- [`mysql`](https://www.mysql.com/) + [`Sequelize`](https://sequelize.org/v4/) (Database + ORM)
- [`linkpreview API`](https://www.linkpreview.net/) (웹 링크 이미지 가져오기 API)

### Front-end

- [`react.js`](https://ko.reactjs.org/) (front-end library)
- [`ant design`](https://ant.design/) (react UI library)
  <br/><br/>

## 네이밍 룰 (Naming Convention)

1. /src/page, /src/page/component js파일들 → 카멜표기법
2. database table 이름 → 파스칼 표기법
3. datbase column 등 → 스네이크 표기법

<br/><br/>
<br/><br/>

## 설치 안내 (Installation)

### 필수 구성 환경 (Prerequisites)

- Mysql (v5.7.x)
- Node.js (v16.17.x Gallium)
- npm (v8.15.x)

### 1. Clone

```shell
$ git clone https://github.com/osamhack2022/WEB_Mili-Groupbuying-Comm_MiliCo
```

### 2. Install Packages

```bash
$ npm install
```

### 3-A. 개발 모드 (Development Mode)

서버 시작 후,
[`http://localhost:3000`](http://localhost:3000) 에 접속

**개발 모드**: react-dev-server(:3000) & express-server(:3001) 동시 구동.  
**요청 흐름**: react-dev-server → proxy → express

### 3-A-1. Start webpack-dev-server (frontend development, hot reloading)

```shell
$ npm run dev
```

### 3-A-2. Start express server (backend development, hot reloading)

```shell
$ npm run start
```

### 3-B. 배포 모드 (Production Mode)

서버 시작 후,
[`http://localhost:3000`](http://localhost:3000) 에 접속

### 3-B-1. Build front-side && Start production server

```shell
$ npm run build start
```

<br/><br/> <br/><br/>

## 팀 정보 (Team Information)

<table>
 <tr>
  <td></td>
  <td>Name</td>
  <td>Role</td>
  <td>github</td>
  <td>e-mail</td>
 </tr>
   
 <tr>
  <td align='center'><img src="https://avatars.githubusercontent.com/u/55678893?s=400&u=d33563c6434ee31ca9962788e006604cbaa51ca9&v=4" width="50" height="50"></td>
  <td align='center'>Byeonggyu Park</td>
  <td align='center'>Team leader, Backend, Productivity Management</td>
  <td align='center'><a href="https://github.com/ggyuchive"><img src="http://img.shields.io/badge/ggyuchive-green?style=social&logo=github"/></a></td>
  <td align='center'><a href="mailto:zarami1214@g.skku.edu"><img src="https://img.shields.io/badge/zarami1214@g.skku.edu-green?logo=gmail&style=social"/></a></td>
 </tr>

 <tr>
  <td align='center'><img src="https://avatars.githubusercontent.com/u/31601268?v=4" width="50" height="50"></td>
  <td align='center'>Changoo Lee</td>
  <td align='center'>UI design, Frontend, Database</td>
  <td align='center'><a href="https://github.com/changooo"><img src="http://img.shields.io/badge/changooo-green?style=social&logo=github"/></a></td>
  <td align='center'><a href="mailto:cgl00@g.skku.edu"><img src="https://img.shields.io/badge/cgl00@g.skku.edu-green?logo=gmail&style=social"/></a></td>
 </tr>
</table>

<br/>

## 저작권 및 사용권 정보 (Copyleft / End User License)

- [MIT](https://github.com/osam2020-WEB/Sample-ProjectName-TeamName/blob/master/license.md)

This project is licensed under the terms of the MIT license.

<!-- Copyright ⓒ 2022 MILICOM All Right Reserved -->
