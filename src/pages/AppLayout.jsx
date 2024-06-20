import { Layout, Flex, Button, Badge } from "antd";
import { ShoppingOutlined, HeartOutlined } from "@ant-design/icons";
//import { Content } from "antd/es/layout/layout";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
const { Header, Footer, Content } = Layout;


const AppLayout = ({ children }) => {
  const cart = useSelector((state) => state.cart.cartItem);
  const wish = useSelector((state) => state.wish.wishList);
  const navigate = useNavigate();

  const goToWishlist = () => {
    navigate("/wishlist");
  };
  const goToCart = () => {
    navigate("/cart");
  };
  //console.log("cart",cart);
  return (
    <Layout>
      <Header style={{ color: "white" }}>
        <Flex gap="large" justify="space-between">
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            E-COMMERCE BUY
          </Link>
          <Flex gap="large">
            <Flex>
              <Button
                style={{
                  color: "white",
                  background: "#001529",
                  border: "none",
                }}
                onClick={() => goToWishlist()}
              >
                <HeartOutlined style={{ fontSize: "22px" }} />
                <Badge dot offset={[-5, -15]} count={wish.length}/>
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
                onClick={() => goToCart()}
              >
                <ShoppingOutlined style={{ fontSize: "22px" }} />
                <Badge
                  count={cart.length}
                  size="small"
                  offset={[-5, -15]}
                  showZero={true}
                  overflowCount={9}
                />
                <p>Cart</p>
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Header>
      <br />
      <br />
      <Content>{children}</Content>
      <br />
      <br />
      <Footer style={{ textAlign: "center" }}>
        <p>E-commerce BUY</p>
        <p>2024 All copyrights reserved.</p>
      </Footer>
    </Layout>
  );
};

export default AppLayout;
