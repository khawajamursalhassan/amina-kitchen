import React from "react";
import ProductCard from "../components/ProductCard";
import axios from "axios";
import "./ProductView.css";

function Products() {
  const [products, setProducts] = React.useState([]);
  
  React.useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/products")
      .then((response) => {
        setProducts(response.data);
        console.log("Products fetched:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const handleAssending = () => {
    axios
      .get("http://127.0.0.1:5000/assending-products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const handleDescending = () => {
    axios
      .get("http://127.0.0.1:5000/descending-products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  return (
    <div>
      <h1 style={{ width: "100%", textAlign: "center" }}>Our Products</h1>
      <div className="search-wrapper">
        <input type="text" placeholder="Search products..." />
        <button>Search</button>
        <button onClick={() => handleAssending()}>Sort Assending</button>
        <button onClick={() => handleDescending()}>Sort Descending</button>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
      >
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Products;
