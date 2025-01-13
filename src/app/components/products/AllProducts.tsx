import React from "react";
import { Card } from "react-bootstrap";
import { FaPlusMinus, FaPlus } from "react-icons/fa6";
import { GoHeart } from "react-icons/go";
import styles from "./Products.module.css";
import Image from "next/image";

interface Product {
  path: string | null | undefined; 
  title: string;
  description: string;
}

interface ProductsProps {
  product: Product;
}

const Products: React.FC<ProductsProps> = ({ product }) => {
  return (
    <Card className={styles.item_container}>
      <div className={styles.img_container}>
        <Image
          className={styles.img}
          src={product.path || 'fallback-image-url'}
          alt="Product"
          width={300} 
          height={200} 
        />
      </div>
      <div className={styles.body_container}>
        <div className={styles.overlay}></div>
        <div className={styles.event_info}>
          <div className={styles.product_title}>
            <h3 className={styles.title}>{product.title}</h3>
          </div>
          <h3 className={styles.price}></h3>
          <div className={styles.icon_container}>
            <button
              className={`${styles.icon_link} ${styles.icon_link_faHeart}`}
              aria-label="Products I liked"
            >
              <GoHeart
                aria-hidden="true"
                className={`${styles.icon_item} ${styles.icon_faHeart}`}
              />
            </button>
            <button
              className={styles.icon_link}
              aria-label="Add to cart"
            >
              <FaPlus
                aria-hidden="true"
                className={`${styles.icon_item} ${styles.icon_faPlus}`}
              />
            </button>
          </div>
          <div className={styles.description}>
            <p>{product.description}</p>
          </div>

          <div className={styles.action}>
            <div>
              <button
                className={styles.link}
                aria-label="Humburger menu navigation"
              >
                <FaPlusMinus
                  aria-hidden="true"
                  className={styles.nav_icon}
                />
                <p>Customize</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Products;
