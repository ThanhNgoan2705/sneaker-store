import axios from "axios";
import React, { useEffect, useState } from "react";
import { calculateTotals, getCart, removeFromCart, updateCartAmount } from "../features/cart/cartSlice";
const CartItem = ({ cartItem}) => {

  const [quantity, setQuantity] = useState(cartItem.quantity);

  const decrementQuantity = () => {
    const newQuantity = quantity - 1 > 0 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    updateCartAmount(cartItem, newQuantity);
  };

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCartAmount(cartItem, newQuantity);
  };
  const id = cartItem.productId;
  console.log(id);
  const [productData, setProductData] = useState(null);
  useEffect(() => {
    axios.get(`http://localhost:8080/api/v1/client-api/product/${id}`).then((response) => {
        setProductData(response.data);
    });
}
, [id]);
if (!productData) {
    return <h2>Loading...</h2>;
  }
  console.log(productData);

  return (
    <article
      key={cartItem.id}
      className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0"
    >
      {/* IMAGE */}
      <img
        src={`https://${productData.images[0].path}`}
        alt={cartItem.name}
        className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover"
      />
      {/* INFO */}
      <div className="sm:ml-16 sm:w-48">
        {/* TITLE */}
        <h3 className="capitalize font-medium text-accent-content">{cartItem.name}</h3>
        {/* COMPANY */}
        <h4 className="mt-2 capitalize text-sm text-accent-content">
          Brand: {productData.brand.name}
        </h4>
        <h4 className="mt-2 capitalize text-sm text-accent-content">
          Size: {cartItem.size.name}
        </h4>
      </div>
      <div className="sm:ml-12">
        {/* AMOUNT */}
        <label htmlFor="amount" className="label p-0">
          <span className="label-text text-accent-content">Amount</span>
        </label>
        <div className=" flex-row max-w-xs  justify-between ">

          <button onClick={decrementQuantity}>
            <i className="fas fa-minus"></i>
          </button>
          <input type="number" className="text-center w-1/2 mx-5" value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
           readOnly />
          <button onClick={incrementQuantity}>
            <i className="fas fa-plus"></i>
          </button>
        </div>
        {/* REMOVE */}
        <button
          className=" btn btn-primary mt-2 link link-warning link-hover text-sm text-accent-content"
          onClick={() => removeFromCart(cartItem.id)}
        >
          remove
        </button>
      </div>

      {/* PRICE */}
      <p className="font-medium sm:ml-auto text-accent-content">{cartItem.size.price* cartItem.quantity}</p>
    </article>
  );
};

export default CartItem;
