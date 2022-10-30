import React, { useState, useEffect, useRef } from "react";
import { Link, useParams} from "react-router-dom";
import { LoadingOutlined, UsergroupAddOutlined, DollarOutlined, CheckCircleOutlined, ShoppingCartOutlined, RocketOutlined } from '@ant-design/icons';
import {Progress, Steps, Table, Tag, Space, Row, Col, Statistic, Button, Tooltip } from 'antd';
import axios from "axios";
import ManageModal from "../components/manageModal.js"
import egg1 from '../assets/img/egg1.png';
import egg2 from '../assets/img/egg2.png';
import egg3 from '../assets/img/egg3.png';
import egg4 from '../assets/img/egg4.png';
import egg5 from '../assets/img/egg5.png';
import { red, green } from '@ant-design/colors';

const {Step} = Steps;
const {Countdown} = Statistic;

const ItemManage = (props) => {
    const {itemId} = useParams();

    const mounted = useRef(false);

    const [auth, setAuth] = useState(0);    //비회원:0 비참여회원:1 구매자:2 멤버:3
    const [item, setItem] = useState(0);
    const [tableData, setTableData] = useState(0);
    const [content, setContent] = useState(0);


    const [test, setTest] = useState(0);

    const enroll = async (id) => {
      const arr = [3,4,5,6,7,8,9,10,11,12,13,14,15,16,17];
      if(item.item_result.stage==0){
        const result = await axios.post(`/rest/members/${item.item_result.id}`, {UserId: arr[id], member_current: item.item_result.member_current});
        if(result){
            setTest((t)=>t+1);
        }
      }else{
        console.log("들어오긴함");
        setTest((t)=>t+1);
      }
    };


    const progress=[
      {group:"process", money:"wait", order:"wait", shipping:"wait", arrive:"wait"},
      {group:"process", money:"wait", order:"wait", shipping:"wait", arrive:"wait"},
      {group:"finish", money:"process", order:"wait", shipping:"wait", arrive:"wait"},
      {group:"finish", money:"finish", order:"process", shipping:"wait", arrive:"wait"},
      {group:"finish", money:"finish", order:"finish", shipping:"process", arrive:"wait"},
      {group:"finish", money:"finish", order:"finish", shipping:"finish", arrive:"finish"}
  ];
    

    const numToKor = (n) => {
      return n==0 ? "영" : (n==1 ? "한" : (n==2 ? "두" : (n==3 ? "세" : (n==4 ? "네" : (n==5 ? "다섯" : (n==6 ? "여섯" : (n==7 ? "일곱" : (n==8 ? "여덟" : (n==9 ? "아홉" : (n==10 ? "열" : "그렇게 큰 숫자는 몰라잉"))))))))));
    } 

    const updateStage = async (stage) => {
      setItem((prevItem)=>({
        ...prevItem,
        item_result: {
          ...prevItem.item_result,
          stage,
        }
      })); 
      try{
        const result = await axios.post(`/rest/items/stage/${item.item_result.id}`,{stage});      
        return result;
      } catch(err){
        console.error(err);
      }
    }
    const updateEggPoint = async () => {
      const egg_point = Math.floor(Math.random() * 5)+1;
      setItem((prevItem)=>({
        ...prevItem,
        item_result: {
          ...prevItem.item_result,
          egg_point,
        }
      })); 
      try{
        const result = await axios.post(`/rest/items/egg/${item.item_result.id}`,{egg_point});      
        return result;
      } catch(err){
        console.error(err);
      }
    }


    const updatePayment = async (payment, memberId) => {
      const updatedMemberArray = item.member_result.map(x=>({
        ...x,
        payment: ( payment==1 || ( payment==4 ? x.payment!=3 : x.id == memberId)) ? payment : x.payment 
        //noMoney type이면 payment가 3이 아닌 요소들을 바꿔줌. allReady type이면 전부 바꿔줌. 나머지 type은 인자로 받은 id 하나만 바꿔줌.
      }))  

      setItem((prevItem)=>(
        {
          ...prevItem,
          member_result: updatedMemberArray
        }
      ));
    
      try{
        const result = await axios.post("/rest/members/payment",{
          payment,
          memberId: (payment==1) ? item.member_result.map(x=>(x.id)) : ((payment==4) ? item.member_result.filter(x=>x.payment!=3).map(x=>(x.id)) :memberId)
        });
        return result;
      } catch(err){
        console.error(err);
      }
      
    }

    const updateAccept = async (accept, memberId) => {
      const updatedMemberArray = item.member_result.map(x=>({
        ...x,
        accept: ( accept ? (memberId==x.id ? 1 : 0) : 0 )   //기본상태(-1)에서 ==> accept를 승인(1)으로 바꿀때는 인자로 받은 id 하나만 바꿔줌. 기본상태(-1)에서 ==> 요청상태(0)으로 바꿀 때는 전부 바꿔줌. 나머지 상태변화는 없음
      }));
      setItem((prevItem)=>{
        prevItem.item_result.price = prevItem.item_result.price*2;
        return {
          ...prevItem,
          member_result: updatedMemberArray,
        }
      });
    
      try{
        const result = await axios.post("/rest/members/accept",{
          accept,
          memberId:(accept ? memberId : item.member_result.map(x=>(x.id))),
          price: item.item_result.price,
          itemId: item.item_result.id 
        });
        return result;
      } catch(err){
        console.error(err);
      }
      
    }

    const onDueMoneyFinish = async() => {
      //온도 내리기
      try{
        console.log("몇번?");
        const trust_info = item.member_result.filter(el=> el.payment<3).map(el=>({
          UserId: el.UserId,
          trust_index: el.User.trust_index,
          offset: 0.8,
        }));
        const temp = await axios.post("/rest/users/trust", {
          trust_info 
        });
      }catch(err){
        console.error(err);
      }
      updatePayment(4);
      updateStage(3);
      setTest((x)=>x+1);
      //메시지 보내기
      // const noMoneyUser = item.member_result.filter(el=> el.payment==4).map(el=>el.UserId);
      // const content = "입금기한이 지났습니다. 빨리 입금해주세요." 
      // const link = `/item-manage/${item.item_result.id}`
      // try{
      //   const result = await axios.post("/rest/messages", {
      //     userId: noMoneyUser,
      //     type: 0,
      //     content,
      //     link
      //   })
      // }catch(err){
      //   console.error(err);
      // }
    }
    
    const onDueGroupFinish = () => {
      if(item.item_result.member_current < item.item_result.member_limit){  
        updateStage(1);                                                          
      }else{                                                                        
        updateStage(2);                                                       
        updatePayment(1);
        updateEggPoint();
        // 메시지: "카운트다운(까지 입금해주세요)" 
        // 입금중 태그
        // 입금 확인 요청 action
        // 알 깨버리기 + 왼쪽 파란칸 가격 최신화
      };
    }

    const columns = [
      {
        title: '소속',
        dataIndex: 'unit',
        key: 'unit',
      },
      {
        title: '이름',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '믿음용사지수',
        dataIndex: 'trust_index',
        key: 'trust_index',
        render: (_, {trust_index}) => 
          trust_index!='-' ? <Progress percent={trust_index} steps={10} size="small" strokeColor={trust_index<30? red[6] :green[6]} /> : '-'
        
      },
      {
        title: '입금여부',
        key: 'tags',
        dataIndex: 'tags',
        render: (_, { tags, record }) => (
          <>
          {
          !tags ? '' : 
            tags.map((tag) => {
              const nameTag = ["모집중", "입금필요", "입금중", "입금완료", "미지급", "지연지급중", "지연지급", "구매자"];
              const color= ["",           "gold",  "geekblue", "lime",  "volcano", "geekblue",  "lime",    "magenta" ];
              return (
                tag==4?
                <Tooltip title={record.phone} key={tag}>
                  <Tag color="volcano">
                      
                      미지급
                      
                  </Tag>
                  </Tooltip>
                :
                <Tag color={color[tag]} key={tag}>
                  {tag ? nameTag[tag] : ''}
                </Tag>
              );
            })}
          </>
        ),
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, {record}) => {
          if(record){
          if(props.login==record.payerId){
            if(record.payment == 2){
              return(
                <Space size="middle" key={record.userId}>
                  <a onClick={()=>{ updatePayment(3, record.memberId); }}>입금확인</a>
                </Space>
              );
            }else if(record.payment == 5){
              return(
                <Space size="middle"  key={record.userId}>
                  <a onClick={()=>{ 
                    updatePayment(6, record.memberId);
                    delNoMoneyMsg(record.userId);
                    }}>지연입금확인</a>
                </Space>
              );
            }
          }else if(record.userId==props.login){
            if(record.accept == 0){ 
              return(
                <Space size="middle"  key={record.userId}>
                  <a onClick={()=>{ updateAccept(1, record.memberId) }}>변경확인</a>
                </Space>
              )
            }else if(record.payment == 1){ 
              return(
                <Space size="middle"  key={record.userId}>
                  <a onClick={()=>{ updatePayment(2, record.memberId);}}>입금확인요청</a>
                </Space>
              )}
            else if(record.payment == 4){ 
              return(
                <Space size="middle"  key={record.userId}>
                  <a onClick={()=>{ updatePayment(5, record.memberId); }}>지연지급신청</a>
                </Space>
              )}
          }
        }
      }
      },
    ];
    useEffect(()=>{
        const getItem = async () => {
            try{
                const result = await axios.get(`/rest/items/${itemId}`);
                if(result.data.result){
                    const data = result.data.data;

                    //setItem
                    setItem(data);
                    
                    //setAuth
                    if(props.login){
                        if(props.login == data.item_result.Payer.UserId) setAuth(2);
                        else if(data.member_result.map(x=>x.UserId).includes(props.login)) setAuth(3);
                        else setAuth(1);
                    }
                    console.log(data.member_result);
                    //setTableData
                    const tData = data.member_result.map((el, id) => (
                      {
                        key: id,
                        unit: el.User.unit,
                        name: el.User.name,
                        trust_index: el.User.trust_index,
                        tags: [el.payment],
                        record: {accept: el.accept, payment:el.payment, userId:el.User.id, memberId:el.id, payerId:data.item_result.Payer.User.id, phone:el.User.phone},
                    }));
                    tData.push({
                      key: 999,
                      unit: data.item_result.Payer.User.unit,
                      name: data.item_result.Payer.User.name,
                      trust_index: data.item_result.Payer.User.trust_index,
                      tags: [7],
                      record: {payer:data.item_result.Payer.User.id},
                    });
                    let i;
                    for(i=0; i<10-tData.length; i++){
                      tData.push({
                        key: i+1000,
                        unit: '',
                        name: '',
                        trust_index: '-',
                        tags: null,
                        record: null,
                      })
                    }
                    setTableData(tData);
                }
            } catch(err){
                console.error(err);
            }
        }
      getItem();
    }, [props.login, test]);

    useEffect(()=>{
      if(mounted.current){
        // 모집중: 0, 24시간 구매자 선택중: 1, 입금중:2, 구매중:3, 배송중:4, 종료:5
        if(item.item_result.stage==0){  //모집중
            if(Date.parse(item.item_result.due_group) < Date.now()){ 
              onDueGroupFinish();
            }else{  //모집기간 안지났으면
              if(item.item_result.member_current == item.item_result.member_limit){
                updateStage(2);
                updatePayment(1);
                updateEggPoint();
              }else{
              setContent(()=>(  
                {
                  memberText: <p>{numToKor(item.item_result.member_limit-item.item_result.member_current)} 명 더 남았습니다.</p>, 
                  payerText: <p>{numToKor(item.item_result.member_limit-item.item_result.member_current)} 명 더 남았습니다.</p> 
                }
              ));
              }
            }
        }else if(item.item_result.stage==1){  //24시간 구매자 선택중
            if(item.member_result[0].accept<0){ //아직 변경요청이 안됐다면 (구매자가 선택지 선택안했다면)
              setContent(()=>( 
                {
                  memberText: <p>"모집이 미달되었습니다. 구매자가 선택할 때까지 기다려주세요(하루이내)"</p>, 
                  payerText: <p><ManageModal updateAccept={updateAccept} setItem={setItem} item={item} updateStage={updateStage} updatePayment={updatePayment} updateEggPoint={updateEggPoint}/></p>,
                }
              ));
            }else if(!(item.member_result.filter(x=>!(x.accept)).length)){ //모두 승인했다면
              updateStage(2);
              updatePayment(1);
              updateEggPoint();
            }else{  //아직 승인이 안됐다면
              setContent(()=>(  
                {
                  memberText: <><p>모집이 미달되어 인당 구매수량이 늘어났습니다. {item.item_result.price/2}{"->"}{item.item_result.price} <a onClick={()=>{ }}>이대로 진행할까요?</a></p></>,
                  payerText: <p>멤버들이 변경요청을 수락하고 있습니다</p>,
                }
              ));
            } 
        }else if(item.item_result.stage==2){ //입금중
          if(Date.parse(item.item_result.due_money) < Date.now()){ //입금기간 지났으면
            onDueMoneyFinish();
            //미지급 처리, 메시지 처리, 툴팁 표시
          }else{  //입금기간 안지났으면~~
            setContent(()=>(  
              {
                memberText:<p>남은 입금 기간:<Countdown onFinish={onDueMoneyFinish} value={item.item_result.due_money} format="D일 H시 m분 s초" /></p>, 
                payerText: <p>남은 입금 기간:<Countdown onFinish={onDueMoneyFinish} value={item.item_result.due_money} format="D일 H시 m분 s초" /></p>,
              }
            ));
          }
        }else if(item.item_result.stage==3){  //구매중
          setContent(()=>(  //텍스트만 바꿔주기
            {
              memberText: <p>구매자가 구매중입니다~~~</p>, 
              payerText: <p>구매가 완료되면 <a onClick={()=>{updateStage(4);}}>다음</a>을 눌러주세요</p>,
            }
          ));
        }else if(item.item_result.stage==4){                    //배송중
          setContent(()=>(  //텍스트만 바꿔주기
            {
              memberText: <p>물건이 배송중입니다. 조금만 기다려 주세요</p>, 
              payerText: <p>물품이 도착하면 체크해주세요!&nbsp;&nbsp;
                <a onClick={async ()=>{
                  updateStage(5);
                  try{
                    const userList = item.member_result.filter(el=> el.payment==3).map(el=>({
                      UserId: el.UserId,
                      trust_index: el.User.trust_index,
                      offset: 1.1,
                    }));
                    userList.push({
                      UserId: item.item_result.Payer.UserId,
                      trust_index: item.item_result.Payer.User.trust_index,
                      offset: 1.1,
                    });
                    console.log(userList);
                    const temp = await axios.post("/rest/users/trust", {trust_info:userList });
                  }catch(err){
                    console.error(err);
                  }
                }}><CheckCircleOutlined /></a>
              </p>,
            }
          ));
        }else{
          setContent(()=>(  //텍스트만 바꿔주기
            { 
              memberText: <p>공동구매가 완료되었습니다!</p>, 
              payerText: <p>공동구매가 완료되었습니다!</p>,
            }
          ));
        }
        //테이블 데이터 최신화
        //테이블 데이터 최신화
        //테이블 데이터 최신화
        const tData = item.member_result.map((el, id) => (
          {
            key: id,
            unit: el.User.unit,
            name: el.User.name,
            trust_index: el.User.trust_index,
            tags: [el.payment],
            record: {accept: el.accept, payment:el.payment, userId:el.User.id, memberId:el.id, payerId: item.item_result.Payer.User.id, phone:el.User.phone},
        }));
        tData.push({
          key: 9999,
          unit: item.item_result.Payer.User.unit,
          name: item.item_result.Payer.User.name,
          trust_index: item.item_result.Payer.User.trust_index,
          tags: [7],
          record: {payer: item.item_result.Payer.User.id},
        });
        var i;
        for(i=0; i<10-tData.length; i++){
          tData.push({
            key: i+1000,
            unit: ' ',
            name: ' ',
            trust_index: '-',
          })
        }
        setTableData(tData);
        //테이블 데이터 최신화
        //테이블 데이터 최신화
        //테이블 데이터 최신화
      } else{
        mounted.current = true;
      }
    }, [item, test]);

    return(
       !(item&&tableData&&content) ? '' :
        <>
            <Countdown onFinish={onDueGroupFinish} value={item.item_result.due_group} style={{visibility: "hidden"}} />
            <p className="manage-title" style={{fontFamily:"Noto Sans KR", fontSize:"1rem", textAlign:"center"}}>{`「${item.item_result.title}」 의 진행상황`}</p>
            
            {auth==2 ? content.payerText : content.memberText}
            <div>
            <Steps style={{width: "70%", margin:"0 auto", marginBottom:"80px"}}>
                <Step status={progress[item.item_result.stage].group} title="모집" icon={progress[item.item_result.stage].group == "process"?<LoadingOutlined />:<UsergroupAddOutlined />} />
                <Step status={progress[item.item_result.stage].money} title="입금" icon={progress[item.item_result.stage].money == "process"?<LoadingOutlined />:<DollarOutlined />} />
                <Step status={progress[item.item_result.stage].order} title="주문" icon={progress[item.item_result.stage].order == "process"?<LoadingOutlined />:<ShoppingCartOutlined />} />
                <Step status={progress[item.item_result.stage].shipping} title="배송" icon={progress[item.item_result.stage].shipping == "process"?<LoadingOutlined />:<RocketOutlined />} />
                <Step status={progress[item.item_result.stage].arrive} title="도착" icon={progress[item.item_result.stage].arrive == "process"?<LoadingOutlined />:<CheckCircleOutlined />} />
            </Steps>
            </div>
            <Row>
              <Col span={8}>
                <div style={{padding:"10px 0px 10px 220px", width: "100%", height: "100%" }}>
                  <div style={{fontFamily:"Noto Sans KR", padding:"30px 0", backgroundColor: "#c9e5ff", textAlign: "center", color: "#1890ff", borderRadius:"10px", width: "100%", height: "100%", maxHeight:"517px" }}>
                    <div>
                      <p style={{fontSize:"1rem", margin:0}}>인당 지불액</p>
                      <p style={{fontSize:"1.5rem", marginBottom:"20px"}} >
                        <strong>
                          {item.item_result.stage<2 ?
                            `${item.item_result.price}₩ + 구매자 인센티브`:
                            `${Math.round((item.item_result.price+(item.item_result.price*item.item_result.egg_point*0.01)))}₩(인센티브: ${Math.round(item.item_result.price*item.item_result.egg_point*0.01)})`}
                        </strong>
                      </p>
                      <p style={{fontSize:"1rem", margin:0}}>납부계좌</p>
                      <p style={{fontSize:"1.5rem", marginBottom:"20px"}}><strong>{`${item.item_result.Payer.bank} ${item.item_result.Payer.account}`}</strong></p>
                    </div>
                      <div style={{position:"relative", marginTop:"0px"}}>
                        {item.item_result.stage<2 ? (
                            item.item_result.member_current / item.item_result.member_limit < 0.2 ? 
                              <img src={egg1} style={{marginBottom:"20px"}}/> :
                                item.item_result.member_current / item.item_result.member_limit < 0.4 ? 
                                  <img src={egg2} style={{marginBottom:"20px"}}/> :
                                    item.item_result.member_current / item.item_result.member_limit < 0.7 ? 
                                      <img src={egg3} style={{marginBottom:"20px"}}/> : 
                                        <img src={egg4} style={{marginBottom:"20px"}}/> ) :
                        <>
                        <img src={egg5} style={{marginBottom:"20px"}}/>
                        <p style={{position:"absolute", bottom:"100px", left:"170px", backgroundColor:"#FFD047", padding:"0 10px", borderRadius:"30px", color:"#D68142", fontFamily:"Noto Sans KR Black", fontSize:"3em"}}>{item.item_result.egg_point}%</p>
                        </>}
                      </div>
                    <p>구매자 인센티브는 모집인원이 다 모이면 알에서 랜덤으로 등장합니다!</p>
                  </div>
                </div>
              </Col>
              <Col span={16}>
                <Table pagination={false} style={{ width: "80%", margin:"0px 0px 0px 80px", padding:"50px"}}columns={columns} dataSource={tableData}/>
              </Col>
            </Row>
            <a onClick={()=>{enroll(test)}} style={{border:"none", color:"black" }}>.</a>
        </>
      
  );
}

export default ItemManage;