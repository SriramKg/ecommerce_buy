import AppLayout from "./AppLayout";
import { useSelector } from "react-redux";
import { Card, Col, Layout, Row, Image } from "antd";

const { Content } = Layout;

const CartPage = () => {
  const cart = useSelector((state) => state.cart.cartItem);
  console.log("In cart page", cart);

  const price = cart.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);

  const prodList = cart.map((product) => (
    <Row key={product.product.id} gutter={[32, 32]} style={{ margin: '0px', padding: '50px' }}>
      <Col xs={24} md={8}>
        <Image width="100%" src={product.product.images[0]} height={200} />
      </Col>
      <Col xs={24} md={16}>
        <Card>
          <p>{product.product.title}</p>
          <p>Category: {product.product.category}</p>
          <p>Quantity: {product.quantity}</p>
          <p>Price: ${product.product.price}</p>
        </Card>
      </Col>
    </Row>
  ));

  return (
    <AppLayout>
      <Content style={{ padding: '0 50px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <Row gutter={[32, 32]} justify="center">
          <Col xs={24} md={16}>
            {prodList}
          </Col>
          <Col xs={24} md={8}>
            <Card>
              <h1>Order Summary</h1>
              <h2>Total Price: ${price.toFixed(2)}</h2>
            </Card>
          </Col>
        </Row>
      </Content>
    </AppLayout>
  );
};

export default CartPage;

