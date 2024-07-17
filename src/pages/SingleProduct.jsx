import axios from "axios";
import React, {useEffect, useState} from "react";
import {
  QuantityInput,
  SectionTitle,
  SelectSize,
} from "../components";
import { FaHeart } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";

import parse from "html-react-parser";
import { addToCart } from "../features/cart/cartSlice";

import { toast } from "react-toastify";
import { store } from "../store";
import {useParams} from "react-router-dom";

// eslint-disable-next-line no-empty-pattern
 const SingleProduct = () => {
    const{wishlistItems} = store.getState().wishlist;
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState([
        "empty star",
        "empty star",
        "empty star",
        "empty star",
    ]);
    const { id } = useParams();
    const [productData, setProductData] = useState(null);
    const [sizes, setSizes] = useState([]);
    const [price, setPrice] = useState(0);
    const[ brand, setBrand] = useState([]);
    const[ type, setType] = useState([]);
    const[image, setImage] = useState([]);
    const[status, setStatus] = useState([]);
    const [sex, setSex] = useState([]);
    const[brandStatus, setBrandStatus] = useState([]);
    const [stock, setStock] = useState(0);
    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/client-api/product/${id}`).then((response) => {
            setProductData(response.data);
        });
    }
    , [id]);

    useEffect(() => {
        if (productData) {
            setSizes(productData.sizes[0].name);
            setPrice(productData.sizes[0].price);
            setBrand(productData.brand);
            setType(productData.type);
            setImage(productData.images);
            setStatus(productData.status);
            setSex(productData.sex);
            setBrandStatus(productData.brand.status);
            setStock(productData.sizes[0].quantity);
        }
    }
    , [productData]);
if (!productData) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
      <SectionTitle title="Product page" path="Home | Shop | Product page" />
        <div className="max-w-7xl mx-auto mt-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="product-image">
                <img
                    src={`http://localhost:8080/${productData.images[0].path}` }
                alt={productData.images[0].path}
                className="w-full h-full object-cover"
                />
            </div>
                <div className="product-details">
                    <h2 className="text-4xl font-bold text-accent-content">
                        Sản phẩm:  {productData.name}
                    </h2>
                    <h4 className="text-2xl font-bold text-accent-content my-8">
                       {/*Giá: {(productData.sizes[0].price).toLocaleString('vi-VN')} VND*/}
                        Giá: {parseFloat(price).toLocaleString('vi-VN')} VND
                    </h4>
                    {/*<SingleProductRating rating={productData.rating} />*/}
                    <p className="text-2xl text-accent-content">
                        {/*{productData.price.current.text}*/}
                    </p>
                    <p className="text-accent-content text-lg">
                        Mô tả: {parse(productData.description || "")}
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                        {/* {selectSizes} */}

                        <SelectSize sizeList={productData.sizes}
                                    size={sizes}
                                    setSize={setSizes}
                                    setStock={setStock}
                                    setPrice={setPrice}
                        />
                        stock={stock}
                        <QuantityInput quantity={quantity} setQuantity={setQuantity}/>
                    </div>
                    <div className="flex gap-4 mt-4">
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                const selectSizes = productData.sizes.find((item) => item.name === sizes);
                                console.log(selectSizes);
                                addToCart({
                                    productData: productData,
                                    quantity: quantity,
                                    size: selectSizes
                                });
                            }}
                        >
                            <FaCartShopping className="mr-2"/>
                            Add to cart
                        </button>
                        {/*<button className="btn btn-secondary">*/}
                        {/*    <FaHeart className="mr-2"/>*/}
                        {/*    Add to wishlist*/}
                        {/*</button>*/}
                    </div>
                </div>
            </div>
        </div>
    </>
  );
 };

export default SingleProduct;
