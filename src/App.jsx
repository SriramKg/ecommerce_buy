import AppRouter from "./routes/AppRouter";
import "./styles.css";
import { Layout, Menu } from "antd";
const { Header, Footer, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header style={{ color: "white" }}>
        <a href="/" style={{ color: 'white', textDecoration: 'none' }}>E-COMMERCE BUY</a>
      </Header>
      <AppRouter />
      <Footer style={{ textAlign: "center" }}>
        <p>E-commerce BUY</p>
        <p>2024 All copyrights reserved.</p>
      </Footer>
    </Layout>
  );
}

export default App;
