import React from "react";
import { Card, Typography } from "antd";
import axios from "axios"

const key = "68108b5f64c63fa7d533db21ef556142"
const previewApiUrl = "http://api.linkpreview.net/"

class ItemCard extends React.Component{

    constructor(props){
        super(props);
    }
    
    render(){   
        return(
            <Card 
                cover={
                    <div className="crop-container">
                        <img src={this.props.data.img} alt="noImage"/>
                    </div>
                }
                bordered={false}
                style={{margin:"20px"}}
                hoverable={true}
                >
                <Typography.Title 
                    ellipsis={ {
                            rows: 1,
                        }
                    }
                    level={3}
                    style={{fontSize:"1rem"}}
                    >{this.props.data.title}</Typography.Title>
                <Typography>{this.props.data.progress}</Typography>
            </Card>
        );
    }

    async componentDidMount(){
        // try {
        //     throw(err);
        //     const data = await axios.get(previewApiUrl, {params: { key, q: this.state.infoLink}});
        //     console.log(data.data.image);
        //     this.setState((state)=>{
        //         state.cardImg = data.data.image;
        //         return state;
        //     })
        // } catch(error){
        //     // console.log(error);
        //     // 실패시 부를 이미지
        //     this.setState((state)=>{
        //         state.cardImg = "https://mp-seoul-image-production-s3.mangoplate.com/36517_1545847047139204.jpg?fit=around|362:362&crop=362:362;*,*&output-format=jpg&output-quality=80";
        //         return state;
        //     })
        // }
    }

}


export default ItemCard;