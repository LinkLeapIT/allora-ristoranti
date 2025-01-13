"use client"
import React, { useContext, useMemo } from "react";
import { ProductContext } from "@/app/contexts/ProductContext";
import { Row, Col } from "react-bootstrap";
import Products from "@/app/components/products/AllProducts";

function Store() {
  const productContext = useContext(ProductContext);

  if (!productContext) {
    throw new Error("ProductContext must be used within a ProductProvider");
  }

  const { state } = productContext;

  const count = useMemo(() => {
    return `${state.items.length} item${state.items.length !== 1 ? "s" : ""}`;
  }, [state.items]);

  return (
    <>
      <div>{count}</div>
      <Row xs={2} md={3} lg={4} className="g-1">
        {state.items.map((product, index) => (
          <Col key={index} align="center">
            <Products product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Store;
