import React, {useEffect, useState} from "react";
import "../styles/Landing.css";
import { Hero, ProductElement, Stats } from "../components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {nanoid} from "nanoid";

export const landingLoader = async () => {
  const response = await axios(
    `http://localhost:8080/api/v1/client-api/product/all?page=1&size=10`
  );
  const data = response.data;
  return { products: data };
};


const Landing = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(
          "http://localhost:8080/api/v1/client-api/product/all?page=1&size=10"
        );
        setProducts(response.data.content);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }
    , []);


  const navigate = useNavigate();

  return (
    <main>
      <Hero />
      <Stats />
      <div className="selected-products">
        <h2 className="text-6xl text-center my-12 max-md:text-4xl text-accent-content">
          Trending Products
        </h2>
        <div className="selected-products-grid max-w-7xl mx-auto">
            {products.map((product) => (
                <ProductElement
                    key={nanoid()}
                    id={product.id}
                    name={product.name}
                    code={product.code}
                    shortDescription={product.shortDescription}
                    description={product.description}
                    status={product.status}
                    sizes={product.sizes}
                    type={product.type}
                    sex={product.sex}
                    brand={product.brand}
                    images={product.images}
                />
            ))}
        </div>
      </div>
    </main>
  );
};

export default Landing;
