import React from 'react';

const OrderFail = () => {
    return (
        <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
        <h1 className="text-3xl font-bold mb-4">Order Failed</h1>
        <p className="text-lg mb-6">Sorry, your order could not be processed. Please try again later.</p>
        <p className="text-sm text-red-600">Error Code: #ERR001</p>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Try Again</button>
      </div>
    );
};

export default OrderFail;