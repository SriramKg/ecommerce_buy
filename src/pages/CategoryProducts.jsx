import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import { Card, Col, Row, Flex, Image, Spin } from "antd";

const CategoryProducts = ({ cat }) => {
  const navigate = useNavigate();
  const [prodCat, setprodCat] = useState([]);
  const goProduct = (pId) => {
    navigate(`/products/${pId}`);
  };

  useEffect(() => {
    console.log(cat);
    fetch(`https://dummyjson.com/products/category/${cat}?limit=4`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json.products);
        setprodCat(json.products);
      });
  }, [cat]);

  if (!prodCat.length) {
    return (
      <Flex align="center" gap="middle">
        <Spin size="large" />
      </Flex>
    );
  }

  const prodCatList = prodCat.map((product) => (
    <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={5}>
      <Card
        title={product.title}
        bordered={false}
        hoverable={true}
        onClick={() => goProduct(product.id)}
      >
        <p>Category : {product.category}</p>
        <Image
          src={product.images[0]}
          alt="productImage"
          preview={false}
          height={250}
        />
        <p>{product.title}</p>
        <p>Product Price : ${product.price}</p>
        <br />
      </Card>
    </Col>
  ));

  return <Row gutter={[16, 20]}>{prodCatList}</Row>;
};

export default CategoryProducts;
