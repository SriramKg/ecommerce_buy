import { useSelector, useDispatch } from "react-redux";
import AppLayout from "./AppLayout";
import { deleteFromWish } from "../store/wishSlice";
import { addToCart, updateToCart } from "../store/cartSlice";
import {
  Col,
  Layout,
  Row,
  Image,
  Card,
  Button,
  Divider,
  notification,
} from "antd";

const WishPage = () => {
  const wish = useSelector((state) => state.wish.wishList);
  const cart = useSelector((state) => state.cart.cartItem);
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();
  console.log("wishpage", wish);

  const deleteWish = (product) => {
    dispatch(
      deleteFromWish({
        product: product,
        quantity: 1,
      })
    );
  };

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Product Removed from Wishlist!!",
    });
  };
  const openNotificationWithIconSuccess = (type) => {
    api[type]({
      message: "Product Added to Cart!!",
    });
  };

  const handleCart = (product) => {
    const isProductExisting = cart.findIndex(
      (item) => item.product.id === product.id
    );
    console.log(isProductExisting);
    console.log(cart[isProductExisting]);
    if (isProductExisting !== -1) {
      dispatch(
        updateToCart({
          product: product,
          quantity: cart[isProductExisting].quantity + 1,
        })
      );
      dispatch(
        deleteFromWish({
          product: product,
          quantity: 1,
        })
      );
    } else {
      dispatch(
        addToCart({
          product: product,
          quantity: 1,
        })
      );
      dispatch(
        deleteFromWish({
          product: product,
          quantity: 1,
        })
      );
    }
  };

  const wishDetails = wish.map((product) => (
    <Col
      xs={24}
      sm={12}
      md={8}
      lg={8}
      xl={8}
      key={product.product.id}
      style={{ padding: "8px" }}
    >
      <Card>
        <Image width="50%" src={product.product.images[0]} height={200} />
        <p>{product.product.title}</p>
        <p>Price : ${product.product.price}</p>
        <p>Product Rating : {product.product.rating}</p>
        <Divider />
        <Button
          type="primary"
          onClick={() => {
            openNotificationWithIconSuccess("success");
            handleCart(product.product);
          }}
        >
          Move to Cart
        </Button>
        <br />
        <br />
        {contextHolder}
        <Button
          onClick={() => {
            openNotificationWithIcon("info");
            deleteWish(product.product);
          }}
          style={{ color: "white", backgroundColor: "hotpink" }}
        >
          Remove from WishList
        </Button>
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
