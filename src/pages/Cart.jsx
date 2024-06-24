import React, { useEffect, useState } from 'react'
import { CartItemsList, CartTotals, SectionTitle } from '../components'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Cart = () => {

  const navigate = useNavigate();
  const loginState = localStorage.getItem("token");
  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  console.log(cartItems);
  useEffect(() => {
    if (!loginState) {
      toast.error("You must be logged in to access this page");
      navigate("/");
    }
  }
    , []);
  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <SectionTitle title="Cart" path="Home | Cart" />
      <div className='mt-8 grid gap-8 lg:grid-cols-12 max-w-7xl mx-auto px-10'>
        <div className='lg:col-span-8'>
          <CartItemsList />
        </div>
        <div className='lg:col-span-4 lg:pl-4'>
          <CartTotals   />
          {loginState ? (

            <button onClick={handleCheckout}
              className='btn bg-blue-600 hover:bg-blue-500 btn-block text-white mt-8'>
              Proceed to checkout
            </button>

          ) : (
            <Link to='/login' className='btn bg-blue-600 hover:bg-blue-500 btn-block text-white mt-8'>
              please login
            </Link>
          )}
        </div>
      </div>
    </>
  )
}

export default Cart