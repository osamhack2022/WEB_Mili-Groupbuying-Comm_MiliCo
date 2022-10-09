import react from "react";
import {Row, Col} from "antd"
import ResultCard from "../components/resultCard";


class Result extends react.Component{
    constructor(props){
        super(props);
        this.state = {
            testData: [
                {
                    title:"부대&lt;-&gt;춘천고속버스터미널 택시이동",
                    progress:"4명 중 3명 모집완료",
                    host:"12중대 상병 김육군",
                    infoLink:"https://zobb.tistory.com/73"
                },
                {
                    title:"스프라이트사이다500mL 8개 묶음",
                    progress:"10명 중 8명 모집완료",
                    host:"본부중대 일병 이공군",
                    infoLink:"https://www.coupang.com/vp/products/1650352?itemId=2208484&vendorItemId=81168170813&q=%EC%8A%A4%ED%94%84%EB%9D%BC%EC%9D%B4%ED%8A%B8+500&itemsCount=36&searchId=a11fd33a89aa4257ae9a527a3041ddd4&rank=0&isAddedCart="
                },
                {
                    title:"24일 도미노 피자 3판 배달",
                    progress:"5명 중 2명 모집완료",
                    host:"9중대 이병 김해병",
                    infoLink:"https://www.tiendeo.co.kr/%EB%A7%A4%EC%9E%A5/%EC%B6%98%EC%B2%9C%EC%8B%9C/%EB%8F%84%EB%AF%B8%EB%85%B8%ED%94%BC%EC%9E%90"
                },
            ],
        };
    }
    render(){
        return(
          <Row gutter={16}>
            {this.state.testData.map( (el,i) => <Col className="gutter-row" key={i} span={8}> <ResultCard data={el}></ResultCard> </Col>)}
          </Row>  
        );
    }
}


export default Result;