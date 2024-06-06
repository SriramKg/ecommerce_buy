import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Col, Layout, Row } from "antd";
import { Flex, Spin, Rate, Image, Button, Divider, notification } from "antd";
import CategoryProducts from "./CategoryProducts";
import { useSelector, useDispatch } from "react-redux";
import { addToCart,updateToCart } from "../store/cartSlice";
import { addToWish, alreadyWishListed } from "../store/wishSlice";
import AppLayout from "./AppLayout";

const ProductDetailPage = () => {
  const [api, contextHolder] = notification.useNotification();
  const cart = useSelector((state) => state.cart.cartItem);
  const wish = useSelector((state) => state.wish.wishList);
  //console.log(cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('buy-token');
  console.log(token);
  const { productId } = useParams();
  const [value, setValue] = useState(3);
  const [product, setProduct] = useState(null);
  const desc = ["terrible", "bad", "normal", "good", "wonderful"];
  console.log(productId);
  useEffect(() => {
    fetch(`https://dummyjson.com/products/${productId}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setProduct(json);
      });
  }, [productId]);

  if (!product) {
    return (
      <Flex align="center" gap="middle">
        <Spin size="large" fullscreen />
      </Flex>
    );
  }
  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Product Added to Cart!!',
      });
  };
  const openNotificationWithIconforWish = (type) => {
    api[type]({
      message: 'Product Added to WishList!!',
      });
  };
  const openNotificationWithIconforWishDetail = (type) => {
    api[type]({
      message: 'Product Already exists in WishList!!',
      });
  }
  const handleWish = (product) => {
    const isProductAlreadyWishlisted = wish.findIndex((item) => item.product.id === product.id);
    if(isProductAlreadyWishlisted !== -1){
      openNotificationWithIconforWishDetail('info');
      // dispatch(alreadyWishListed({
      //   product: product,
      // }))
    }
    else{
      openNotificationWithIconforWish('success'); 
      dispatch(addToWish({
        product: product,
      }))
    }
  }
  const handleCart = (product) => {
    const isProductExisting = cart.findIndex((item) => item.product.id === product.id);
    console.log(isProductExisting);
    console.log(cart[isProductExisting]);
    if(isProductExisting !== -1) {
      dispatch(updateToCart({
        product: product,
        quantity: cart[isProductExisting].quantity + 1,
      }))
    }
    else{
      dispatch(addToCart({
        product: product,
        quantity: 1,
      }))
    }
  }

  return (
    <AppLayout>
      <Layout>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Image width="auto" src={product.images[0]} height={400} />
          </Col>
          <Col xs={24} md={12}>
            <Card>
              <p>Category : {product.category}</p>
              <h1>{product.title}</h1>
              <p>{product.description}</p>
              <br />
              <Flex gap="middle" vertical>
                <Rate tooltips={desc} onChange={setValue} value={value} />
                {value ? <span>{desc[value - 1]}</span> : null}
              </Flex>
              <br />
              <h2>Product Price : ${product.price}</h2>
              <br />
              <Flex>
                {contextHolder}
                <Button type="primary" style={{ marginRight: "10px" }} onClick={() => {openNotificationWithIcon('success'); handleCart(product)}}>
                  Add to Cart
                </Button>
                <Button type="primary" style={{backgroundColor: "#ff6680"}} onClick={() => {handleWish(product)}}> WishList</Button>
              </Flex>
              <br />
            </Card>
          </Col>
        </Row>
        <br />
        <Divider dashed />
        <h1>You might also like</h1>
        <br />
        <CategoryProducts cat={product.category} />
      </Layout>
    </AppLayout>
  );
};

export default ProductDetailPage;
