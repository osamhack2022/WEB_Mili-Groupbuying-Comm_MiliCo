import React from "react";
import { Card, Typography } from "antd";
import axios from "axios"

const key = "68108b5f64c63fa7d533db21ef556142"
const previewApiUrl = "http://api.linkpreview.net/"

class ResultCard extends React.Component{

    constructor(props){
        super(props);
        const tempData = this.props.data;
        this.state = tempData;
    }
    
    render(){   
        return(
            <Card 
                cover={
                    <div className="crop-container">
                        <img src={this.state.cardImg} alt="noImage"/>
                    </div>
                }
                bordered={true}
                style={{width:"80%"}}
                hoverable={true}
                >
              <Typography.Title level={3}>{this.state.title}</Typography.Title>
              <Typography>{this.state.progress}</Typography>
              <Typography>{this.state.host}</Typography>
            </Card>
        );
    }

    async componentDidMount(){
        try {
            const data = await axios.get(previewApiUrl, {params: { key, q: this.state.infoLink}});
            console.log(data.data.image);
            this.setState((state)=>{
                state.cardImg = data.data.image;
                return state;
            })
        } catch(error){
            console.log(error);
            // 실패시 부를 이미지
            this.setState((state)=>{
                state.cardImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Noimage.svg/739px-Noimage.svg.png";
                return state;
            })
        }
    }

}


export default ResultCard;