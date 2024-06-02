import { json, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import { Flex, Spin, Button } from "antd";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
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
    <Col span={5} key={product.id}>
      <Card title={product.title} bordered={false} hoverable={true}>
        <div
          className="product-item"
          key={product.id}
          onClick={() => goProduct(product.id)}
        >
          <p>Category : {product.category}</p>
          <img
            style={{ width: "400px" }}
            src={product.images[0]}
            alt="productImage"
          /> 
          <p>{product.title}</p>
          <p>Product Price : ${product.price}</p>
        </div>
        <br />
        <Flex wrap gap="small">
        <Button type="primary">Add to Cart</Button>
        </Flex>
      </Card>
    </Col>
  ));

  return (
    <>
      <br />
      <Row gutter={5}>
        <div className="product-list">{productsList}</div>
      </Row>
      <br />
      <button type="submit" onClick={handleSubmit}>
        Back to Login
      </button>
    </>
  );
};

export default ProductPage;
