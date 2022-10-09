import Intro from "./pages/intro.js";
import Result from "./pages/result.js";
import ResultCard from "./components/resultCard.js"
import { Layout, Menu } from 'antd';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./assets/css/App.css"
import './../node_modules/antd/dist/antd.css';
const { Header, Footer, Content } = Layout;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            items={new Array(15).fill(null).map((_, index) => {
              const key = index + 1;
              return {
                key,
                label: `nav ${key}`,
              };
            })}
          />
        </Header>
        <Content>
        <div className="site-layout-content">
          <Routes>
              <Route path="/" element={<Intro/>}></Route>
              <Route path="/result/*" element={<Result/>}></Route>
          </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </BrowserRouter>
    </div>
  );
}

export default App;
