import { Divider, Modal, DatePicker, Button, Space } from 'antd';
import React, { useState } from 'react';
import axios from "axios";
import moment from "moment";



const ManageModal = (props) => {
  //modal관련
  const [isModalOpen, setIsModalOpen] = useState(false);
  const disabledDate = (current) => {
    return current && current < moment(props.item.item_result.due_group.split('T')[0], 'YYYY-MM-DD')
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const hideModal = () => {
    setIsModalOpen(false);
  };

  //Option1 관련
  let newDue = null;
  const updateDue= async (due_group) => {
    props.setItem((prevItem)=>({
      ...prevItem,
      item_result: {
        ...prevItem.item_result,
        due_group,
      }
    })); 
    try{
      const result = await axios.post(`/rest/items/due/${props.item.item_result.id}`,{due_group});
      if(result) props.updateStage(0);
      return result;
    } catch(err){
      console.error(err);
    }
  }
  const delayDue = () => {
    if(newDue) {
      updateDue(newDue);
      hideModal();
    }
    else alert("날짜를 정해주세요");
  }

  //Option2 관련
  const updateMemberLimit= async (member_limit) => {
    props.setItem((prevItem)=>({
      ...prevItem,
      item_result: {
        ...prevItem.item_result,
        member_limit,
      }
    })); 
    try{
      const result = await axios.post(`/rest/items/member/${props.item.item_result.id}`,{member_limit});
      if(result) props.updateStage(0);
      return result;
    } catch(err){
      console.error(err);
    }
  }


  const goNextStage = () => {
    updateMemberLimit(props.item.item_result.member_current);

    props.updateStage(2);
    props.updatePayment(1);
    props.updateEggPoint();
    hideModal();
  }
  const askChange = () => {
    props.updateAccept(0);
    hideModal();
  }

  //datePicker
  const onChange = (date, dateString) => {
    newDue = dateString;
  };
  return (
    <>
      모집이 미달됐습니다. <a onClick={showModal}>어떻게 하실건가요?</a>
      <Modal title="모집 내용 변경하기" open={isModalOpen} onCancel={hideModal} footer={null}>
        <div style={{padding: "10px"}}>
        <Divider orientation='left'>Option 1</Divider>
          <p style={{fontSize:"1rem"}}>모집기한을 <span style={{color:"#006BCC", fontWeight:"bold"}}>연기</span>할래요</p>
          <Space style={{marginBottom:"30px"}}>
          <DatePicker disabledDate={disabledDate} onChange={onChange} showTime format="YYYY-MM-DD HH:mm:ss" />
          <Button onClick={delayDue}>연기하기</Button>
          </Space>
        <Divider orientation='left'>Option 2</Divider>
          <p style={{fontSize:"1rem"}}>지금 모인 멤버들로만<span style={{color:"#006BCC", fontWeight:"bold"}}> 이대로</span>  진행할게요</p>
          <Button style={{width: "100%", marginBottom:"30p x"}} type="primary" onClick={goNextStage}>다음단계 넘어가기</Button>
          <br />
        <Divider orientation='left'>Option 3</Divider>
          <p style={{fontSize:"1rem"}}>지금이 최소 주문가능 수량이에요. <span style={{color:"#006BCC", fontWeight:"bold"}}>인당 구매 수량</span>을 늘려서 진행할게요</p>
          <p>*멤버들의 동의가 필요합니다.</p>
          <Button style={{width: "100%", marginBottom:"50px"}}type="primary" onClick={askChange}>인당 구매수량 늘리기</Button>
          </div>
      </Modal>
      
    </>
  );
};
export default ManageModal;