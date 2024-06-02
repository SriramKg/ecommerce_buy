import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Col, Layout, Row } from "antd";
import { Flex, Spin, Rate, Image, Button } from "antd";
import CategoryProducts from "./CategoryProducts";

const ProductDetailPage = () => {
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
  }, []);

  

  if (!product) {
    return (
      <Flex align="center" gap="middle">
        <Spin size="large" fullscreen />
      </Flex>
    );
  }

  return (
    <>
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
              <Button type="primary" style={{ marginRight: '10px' }}>Add to Cart</Button>
              <br />
            </Card>
          </Col>
        </Row>
        <br />
        <h1>You might also like</h1>
        <br />
        <CategoryProducts cat={product.category}/>
      </Layout>
    </>
  );
};

export default ProductDetailPage;
