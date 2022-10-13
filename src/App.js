import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Intro from "./pages/intro.js";
import Result from "./pages/result.js";
import ResultId from "./pages/resultId.js";
import Register from "./pages/register.js";
import Forgot from "./pages/forgot.js";
import NavigationBar from "./components/NavigationBar.js";
import { Layout } from 'antd';


import './../node_modules/antd/dist/antd.compact.min.css';

import "./assets/css/myCss.css"

const { Header, Footer, Content } = Layout;

class App extends React.Component {
  render(){
    return (
    <BrowserRouter>
      <div className="App">
        <Layout>
          <Header className="my-header">
            <NavigationBar/>
          </Header>
          <Content>
            <div className="site-layout-content">
              <Routes>
                <Route path="/" element={<Intro/>}></Route>
                <Route path="/result/*" element={<Result/>}></Route>
                <Route path="/register/*" element={<Register/>}></Route>
                <Route path="/forgot" element={<Forgot/>}></Route>
                <Route path="/resultId" element={<ResultId/>}></Route>
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>MiliCom 2022</Footer>
        </Layout>
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
