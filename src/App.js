import React, {useState, useEffect} from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Intro from "./pages/intro.js";
import ItemList from "./pages/itemList.js";
import Item from "./pages/item.js";
import Register from "./pages/register.js";
import ItemCreate from "./pages/itemCreate.js";
import ItemManage from "./pages/itemManage.js";
import MyItemList from "./pages/myItemList.js";
import NavigationBar from "./components/NavigationBar.js";
import { Layout } from 'antd';
import axios from 'axios';

import './../node_modules/antd/dist/antd.compact.min.css';

import "./assets/css/myCss.css"

const { Header, Footer, Content } = Layout;

const App = ()=> {
    const [login, setLogin] = useState(0);
    
    useEffect(()=>{
      const sessionCheck = async () => {
        const result = await axios.get("/rest/users/sessions");
        if(result.data.result){
          setLogin(result.data.data.id);
        }
      }
      sessionCheck();
    },[])

    return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          <Header className="my-header">
            <NavigationBar login={login} setLogin={setLogin} />
          </Header>
          <Content>
            <div className="site-layout-content">
              <Routes>
                <Route path="/" element={<Intro/>}></Route>
                <Route path="/item-list" element={<ItemList/>}></Route>
                <Route path="/my-item-list" element={<ItemList login={login} isMyList={true}/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
                <Route path="/item/:itemId" element={<Item login={login}/>}></Route>
                <Route path="/item-create" element={<ItemCreate login={login} />}></Route>
                <Route path="/item-manage/:itemId" element={<ItemManage login={login}/>}></Route>
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>MiliCom 2022</Footer>
        </Layout>
      </div>
    </BrowserRouter>
    );
  }

export default App;
