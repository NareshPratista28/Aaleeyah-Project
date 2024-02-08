import React from "react";
import "./RelatedProducts.css";
import all_product from "../Assets/all_product";
import Item from "../Item/Item";

const RelatedProducts = () => {
  const shuffledProducts = all_product.sort(() => 0.5 - Math.random());
  const randomProducts = shuffledProducts.slice(0, 4);
  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {randomProducts.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
