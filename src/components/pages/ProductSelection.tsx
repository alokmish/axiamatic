import { useState, useEffect } from "react";
import axios from "axios";

import ItemCardGroup from "../base/ItemCardGroup";
import AddProducts from "./AddProducts";

const PRODUCT_GROUP_CAPACITY = 4;

const ProductSelectionPage = () => {
  const [products, setProducts] = useState([] as Product[]);
  const [addedProducts, setAddedProducts] = useState([] as Product[]);

  const handleProductSelection = (itemId: string | number) => {
    // If required products are already added, return early
    if (addedProducts.length === PRODUCT_GROUP_CAPACITY) return;

    // If product is already added, return early
    const [existingItem] = addedProducts.filter((p) => p.id === itemId);
    if (existingItem) return;

    // Add product
    const [filteredProduct] = products.filter((p) => p.id === itemId);
    setAddedProducts([...addedProducts, filteredProduct]);
  };

  const handleItemRemoval = (itemId: string | number) => {
    setAddedProducts(addedProducts.filter((p) => p.id !== itemId));
  };

  const handleProductSave = () => {
    if (addedProducts.length < 4) return;
    axios
      .post("http://localhost:3000/addedProducts", addedProducts)
      .then((response) => {
        console.log(response);
      });
  };

  useEffect(() => {
    axios.get("http://localhost:3000/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 justify-center items-center app">
      <ItemCardGroup
        items={addedProducts}
        capacity={PRODUCT_GROUP_CAPACITY}
        removeItemHandler={(itemId) => handleItemRemoval(itemId)}
      />
      <AddProducts
        products={products}
        productSelectionHandler={(itemId) => handleProductSelection(itemId)}
        productSaveHandler={handleProductSave}
      />
    </div>
  );
};

export default ProductSelectionPage;

export interface Product {
  id: string;
  title: string;
  icon: string;
}
