import React from 'react';
import {Link} from "react-router-dom";

const OrderSuccess = () => {
    return (
        <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
        <h1 className="text-3xl font-bold mb-4">Order Confirmation</h1>
        <p className="text-lg mb-6">Thank you for your order! Your order has been successfully placed.</p>
        <p className="text-sm text-gray-600">Order Number: #123456</p>
        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            <Link to={"/order-detail"}/>View Order Details</button>
      </div>
    );
};

export default OrderSuccess;