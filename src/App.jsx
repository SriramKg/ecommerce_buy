import AppRouter from "./routes/AppRouter";
import "./styles.css";
import { Layout, Flex, Button } from "antd";
import {
  ShoppingTwoTone,
  ShoppingOutlined,
  HeartOutlined,
} from "@ant-design/icons";
const { Header, Footer, Content } = Layout;

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
