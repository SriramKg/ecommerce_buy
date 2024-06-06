import {  useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToWish, alreadyWishListed } from "../store/wishSlice";
import { Card, Col, Row } from "antd";
import { Flex, Spin, Button, Image } from "antd";
import AppLayout from "./AppLayout";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wish = useSelector((state) => state.wish.wishList);
  console.log("wishlist",wish);

  const handleWish = (product) => {
    const isProductAlreadyWishlisted = wish.findIndex((item) => item.product.id === product.id);
    console.log(isProductAlreadyWishlisted);
    if(isProductAlreadyWishlisted !== -1){
      dispatch(alreadyWishListed({
        product: product,
      }))
    }
    else{
      dispatch(addToWish({
        product: product,
      }))
    }
  }

  const handleSubmit = () => {
    navigate("/");
  };
  const goProduct = (pId) => {
    navigate(`/products/${pId}`);
  };

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((json) => {
        console.log(json.products);
        setProducts(json.products);
      });
  }, []);

  if (!products.length) {
    return (
      <Flex align="center" gap="middle">
        <Spin size="large" fullscreen />
      </Flex>
    );
  }

  const productsList = products.map((product) => (
    <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={5} >
      <Card title={product.title} bordered={false} hoverable={true} onClick={() => goProduct(product.id)}>
          <p>Category : {product.category}</p>
          <Image
            src={product.images[0]}
            alt="productImage"
            preview={false} height={250}
          /> 
          <p>{product.title}</p>
          <p>Product Price : ${product.price}</p>
        <br />
        <Flex wrap gap="small">
        <Button type="primary" onClick={(e) => handleWish(product)} style={{backgroundColor: "#ff6680"}}>Add to Wishlist</Button>
        </Flex>
      </Card>
    </Col>
  ));

  return (
    <AppLayout>
      <br />
      <Row gutter={5}>
        <div className="product-list">{productsList}</div>
      </Row>
      <br />
      {/* <button type="submit" onClick={handleSubmit}>
        Back to Login
      </button> */}
    </AppLayout>
  );
};

export default ProductPage;
