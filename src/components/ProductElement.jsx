import React from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";

// eslint-disable-next-line react/prop-types
const ProductElement = ({ id, name, code, shortDescription,description,status,sizes,sex,type,brand,images  }) => {
  const product = {
    id,
    name,
    code,
    shortDescription,
    description,
    sizes,
  };
  return (
    <div className="max-w-2xl">
      <div className="shadow-md rounded-lg max-w-sm bg-base-100">
        <Link to={`/shop/product/${id}`} onClick={() => window.scrollTo(0, 0)}>
          <img
            className="rounded-t-lg p-8"
            src={images[0]}
            alt="product image"
          />
        </Link>
        <div className="px-5 pb-5">
          <Link to={`/shop/product/${id}`} onClick={() => window.scrollTo(0, 0)}>
            <h3 className="font-semibold text-xl tracking-tight mb-5 text-accent-content">
              {name}
            </h3>
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-accent-content  ">
                <p className="text-2xl font-semibold text-accent-content">
                  Sale</p>
              </span>
            </div>
            <div className="flex items-center justify-between mt-5">
            <button className="btn btn-primary">
              <Link to={`/shop/product/${id}`} onClick={() => window.scrollTo(0, 0)}>
            <h5 className=" text-lg  text-center ">
              See Detail
            </h5>
          </Link>
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductElement;
