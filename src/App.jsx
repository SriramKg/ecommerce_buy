import {useNavigate} from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import "./styles.css";
import { Layout, Flex, Button, Badge, Avatar } from "antd";
import {
  ShoppingOutlined,
  HeartOutlined,
} from "@ant-design/icons";
const { Header, Footer } = Layout;

function App() {

  return (
    <Layout>
      <Header style={{ color: "white" }}>
        <Flex gap="large" justify="space-between">
          <a href="/" style={{ color: "white", textDecoration: "none" }}>
            E-COMMERCE BUY
          </a>
          <Flex gap="large">
            <Flex>
              <Button
                style={{
                  color: "white",
                  background: "#001529",
                  border: "none",
                }}
              >
                <HeartOutlined style={{ fontSize: "22px" }} />
                <p>WishList</p>
              </Button>
            </Flex>
            <Flex>
              <Button
                style={{
                  color: "white",
                  background: "#001529",
                  border: "none",
                }}
              >
                <ShoppingOutlined style={{ fontSize: "22px" }} />
                <Badge count={8} size="small" offset={[-5, -15]} showZero={true} overflowCount={9}/>
                <p>Cart</p>
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Header>
      <br />
      <br />
      <AppRouter />
      <Footer style={{ textAlign: "center" }}>
        <p>E-commerce BUY</p>
        <p>2024 All copyrights reserved.</p>
      </Footer>
    </Layout>
  );
}

export default App;
