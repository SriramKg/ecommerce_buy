import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Col, Row } from "antd";
import { Flex, Spin, Rate, Image } from "antd";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [value, setValue] = useState(3);
  const [product, setProduct] = useState(null);
  const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
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
        <Spin size="large" fullscreen/>
      </Flex>
    );
  }

  return (
    <>
      <h1>Hello Welcome to PDP page</h1>
      <Row gutter={50}>
        <Col span={25}>
          <Card title={product.title} bordered={false}>
            <div>
              <p>Category : {product.category}</p>
              <Image width="auto" src={product.images[0]} />
              <p>{product.title}</p>
              <Flex gap="middle" vertical>
                <Rate tooltips={desc} onChange={setValue} value={value} />
                {value ? <span>{desc[value - 1]}</span> : null}
              </Flex>
              <p>Product Price : ${product.price}</p>
              <br />
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetailPage;
