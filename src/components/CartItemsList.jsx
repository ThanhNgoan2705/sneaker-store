import React, { useEffect, useState } from 'react'
import CartItem from './CartItem';


const CartItemsList = () => {
    
    let cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    if(!Array.isArray(cartItems)){
        cartItems = [];
    }

  return (
    <>
      {cartItems.map((item) => {
        return <CartItem key={item.id} cartItem={item} />;
      })}
    </>
  )
}

export default CartItemsList