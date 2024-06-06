import { useSelector, useDispatch } from "react-redux";
import AppLayout from "./AppLayout";
import { deleteFromWish } from "../store/wishSlice";
import { Col, Layout, Row, Image, Card, Button, Divider } from "antd";

const WishPage = () => {
  const wish = useSelector((state) => state.wish.wishList);
  const dispatch = useDispatch();
  console.log("wishpage", wish);

  const deleteWish = (product) => {
    dispatch(deleteFromWish({
        product: product.product,
    }))
  }

  const wishDetails = wish.map((product) => (
    <Col xs={24} sm={12} md={8} lg={6} key={product.product.id} style={{ padding: '8px' }}>
      <Card>
        <Image width="100%" src={product.product.images[0]} height={200} />
        <p>{product.product.title}</p>
        <p>Price : ${product.product.price}</p>
        <p>Product Rating : {product.product.rating}</p>
        <Divider />
        <Button type="primary">Move to Cart</Button>
        <br />
        <br />
        <Button onClick={() => deleteWish(product)} style={{color: 'white', backgroundColor: 'red'}}>Remove from WishList</Button>
      </Card>
    </Col>
  ));

  return (
    <AppLayout>
      <Layout>
        <Row gutter={[16, 16]} justify="center">
          {wishDetails}
        </Row>
      </Layout>
    </AppLayout>
  );
};

export default WishPage;

