import express from 'express';
import path from 'path';
import { sequelize } from './models/index.js'; 
import session from 'express-session';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3001;


sequelize
  .sync()
  .then(() => console.log('connected database'))
  .catch(err => console.error('occurred error in database connecting', err))



app.use(bodyParser.json()); //rest 요청할 때, body의 content-type을 application/json으로 보낼 수 있게함 
app.use(bodyParser.urlencoded({ extended: true })); //rest 요청할 때, body의 content-type을 application/x-www-form-urlencoded 로 보낼 수 있게함 
//extended true를 사용하면 querystring이 아닌 qs 라이브러리를 사용하여 body를 파싱함. qs사용하면 body의 depth를 표현가능하다.
app.use('/', express.static(path.join(__dirname, '../build'))); //웹팩으로 묶은 프론트 파일들 사용하게 함 (파일들의 라우팅은 뷰가 완료한 상태)

// 세션
app.use(cookieParser(process.env.COOKIE_SECRET)); //브라우저가 서버에 레스트api에 쿠키실어서 날리면 그 쿠키를 req에서 접근할 수 있게 해줌 
 
app.use(session({
  secure: false,	// https 환경에서만 session 정보를 주고받도록처리
  secret: process.env.COOKIE_SECRET, // 암호화하는 데 쓰일 키
  resave: false, // 세션을 언제나 저장할지 설정함
  saveUninitialized: true, // 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정
  cookie: {	//세션 쿠키 설정 (세션 관리 시 클라이언트에 보내는 쿠키)
    httpOnly: true, // 자바스크립트를 통해 세션 쿠키를 사용할 수 없도록 함
    Secure: true
  },
  name: 'session-cookie' // 세션 쿠키명 디폴트값은 connect.sid이지만 다른 이름을 줄수도 있다.
}));
// 여기까지 세션

app.use('/rest/users', require('./routes/user'));
app.use('/rest/items', require('./routes/item'));
app.use('/rest/members', require('./routes/member'));
app.use('/rest/messages', require('./routes/message'));


app.listen(port, () => {
    console.log("I am listening");
})