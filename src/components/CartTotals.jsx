import React from 'react'

const CartTotals = ({cartItems}) => {
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const amount = cart.reduce((total, item) => total + item.quantity, 0);
 const total = cart.reduce((total, item) => total + item.size.price * item.quantity, 0);
  const tax = total / 5;
  const shipping = 30000;
  return (
    <div className='card bg-base-200'>
      <div className='card-body'>
        {/* SUBTOTAL */}
        <p className='flex justify-between text-xs border-b border-base-300 pb-2 text-accent-content'>
          <span>Subtotal</span>
          <span className='font-medium'>{ Math.round(total) }VND</span>
        </p>
        {/* SHIPPING */}
        <p className='flex justify-between text-xs border-b border-base-300 pb-2 text-accent-content'>
          <span>Shipping</span>
          <span className='font-medium'>{ shipping }VND</span>
        </p>
        {/* Tax */}
        <p className='flex justify-between text-xs border-b border-base-300 pb-2 text-accent-content'>
          <span>Tax 20%</span>
          <span className='font-medium'>{Math.round(tax)}VND</span>
        </p>
        {/* Order Total */}
        <p className='flex justify-between text-sm mt-4 pb-2 text-accent-content'>
          <span>Order Total</span>
          <span className='font-medium'>{ Math.round(total + shipping + tax) }VND</span>
        </p>
      </div>
    </div>
  )
}

export default CartTotals