import AppLayout from "./AppLayout";
import { useSelector, useDispatch } from "react-redux";
import { addToCart,updateToCart,deleteAProduct } from "../store/cartSlice";
import { addToWish } from "../store/wishSlice";
import { Card, Col, Layout, Row, Image, InputNumber, Button, notification } from "antd";
import {DeleteOutlined, HeartOutlined,BorderTopOutlined} from "@ant-design/icons";

const { Content } = Layout;

const CartPage = () => {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItem);
  const wish = useSelector((state) => state.wish.wishList);
  console.log("In cart page", cart);

  const openNotification = (placement) => {
    api.success({
      message: 'Product Added to WishList!!',
      placement,
    });
  };

  const openNotificationWithIconforWishDetail = (placement) => {
    api.info({
      message: 'Product Already exists in WishList!!',
      placement,
      });
    }

  const moveToWish = (product) => {
    const isProductAlreadyWishlisted = wish.findIndex((item) => item.product.id === product.id);
    if(isProductAlreadyWishlisted !== -1){
      openNotificationWithIconforWishDetail('top');
    }
    else{
      openNotification('top'); 
      dispatch(addToWish({
        product: product,
      }))
      dispatch(deleteAProduct({
        product: product,
      }))
    }
  }

  const handleCart = (product, quantity) => {
    const isProductExisting = cart.findIndex((item) => item.product.id === product.id);
    console.log(isProductExisting);
    console.log(cart[isProductExisting]);
    console.log(quantity);
    if(isProductExisting !== -1) {
      dispatch(updateToCart({
        product: product,
        quantity: quantity,
      }))
    }
    else{
      dispatch(addToCart({
        product: product,
        quantity: 1,
      }))
    }
  }

  const deleteCart = (product) => {
    dispatch(deleteAProduct({
      product: product.product,
    }))
  }

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
          <InputNumber min={1} defaultValue={product.quantity} onChange={(value) => handleCart(product.product, value)}/>
          <p>Price: ${product.product.price}</p>
          <Button onClick={() => {moveToWish(product.product)}}> <HeartOutlined />Move to Wishlist</Button>
          <Button onClick={() => {deleteCart(product)}}><DeleteOutlined />Delete</Button>
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
          {contextHolder}
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

