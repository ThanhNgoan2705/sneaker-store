import React, { useEffect, useState } from "react";
import {
    Filters,
    ProductElement,
    SectionTitle,
} from "../components";
import "../styles/Shop.css";
import axios from "axios";
import { nanoid } from "nanoid";

const Shop = () => {
    const [products, setProducts] = useState([]); // Use state to manage products

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios(
                    "http://localhost:8080/api/v1/client-api/product/all"
                );
                console.log("productList"+response.data.content);
                console.table(response.data.content)
                setProducts(response.data.content);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchData();
    }, []); // Empty dependency array to fetch data only once
    return (
        <>
            <SectionTitle title="Shop" path="Home | Shop" />
            <div className="max-w-7xl mx-auto mt-5">
                <Filters />
                {products.length === 0 && ( // Check for empty products data
                    <h2 className="text-accent-content text-center text-4xl my-10">
                        No products found for this filter
                    </h2>
                )}
                <div className="grid grid-cols-4 px-2 gap-y-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 shop-products-grid">
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
            {/*<Pagination />*/}
        </>
    );
};

export default Shop;
