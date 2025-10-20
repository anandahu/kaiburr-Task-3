import React from "react";
import { Layout, Menu, theme } from "antd";
import "./App.css";
import TaskList from "./components/TaskList"; // <-- IMPORT THE COMPONENT

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: "flex", alignItems: "center", color: "white" }}>
        <div className="logo" style={{ color: "white", marginRight: "20px" }}>
          Kaiburr Task Manager
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={[{ key: "1", label: "Tasks" }]}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: "48px" }}>
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          {/* USE THE TaskList COMPONENT HERE */}
          <TaskList />
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Kaiburr Task Manager UI ©{new Date().getFullYear()} Created with Ant
        Design
      </Footer>
    </Layout>
  );
};

export default App;
