import React, { useEffect,useState } from 'react';
import axios from "axios";
const PaymentMethods = ({selectedPaymentMethod, onPaymentMethodChange}) => {
    const [paymentMethod, setPaymentMethod] = useState([]);// Use state to manage payment methods
    useEffect(() => {
        axios.get( "http://localhost:8080/api/v1/client-api/payment-method/all" ).then((response) => {
          setPaymentMethod(response.data);
        });
      }
        , []);
    const handleSelectPaymentMethod = (event) => {
        onPaymentMethodChange(event.target.value);

    };

    return (
        <div>
            <h2>Payment Methods</h2>
            <select className='w-full p-2 border border-gray-300 rounded mt-1'
                id="paymentMethod" value={selectedPaymentMethod} onChange={handleSelectPaymentMethod}>
                <option value="">Select Payment Method</option>
             {paymentMethod.map((item, index) => (
                <option value={item.code} key={index} className="text-xl">
                    {item.code}
                </option>
            ))}
                
            </select>
        </div>
    );
};

export default PaymentMethods