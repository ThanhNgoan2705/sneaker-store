import React, { useEffect, useState } from 'react';
import { CartTotals } from '../components';
import { PaymentMethods } from '../components';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [note, setNote] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [wardName, setWardName] = useState('');
    const [districtName, setDistrictName] = useState('');
    const [provinceName, setProvinceName] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    const userId = JSON.parse(localStorage.getItem('id') || '{}');

    const totalAmount = Math.round(cartItems.reduce((total, item) => total + item.size.price * item.quantity, 0));
    const tax = Math.round(totalAmount / 5);
    const shipping = 30000;
    const totalPay = Math.round(totalAmount + tax + shipping);
    const  token = localStorage.getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };
    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };
    const handleWardNameChange = (e) => {
        setWardName(e.target.value);
    };
    const handleDistrictNameChange = (e) => {
        setDistrictName(e.target.value);
    };
    const handleProvinceNameChange = (e) => {
        setProvinceName(e.target.value);
    };
    const handleNoteChange = (e) => {
        setNote(e.target.value);
    };
    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(selectedPaymentMethod);
    };
    const [sizes, setSizes] = useState([]);
    useEffect(() => {

        if (cartItems.length > 0) {
            const sizes = cartItems.map((item) => {
                return {
                    size: item.size.id,
                    quantity: item.quantity,
                    price: item.size.price,
                };
            });
            setSizes(sizes);
        }
    }, []);
    console.log(sizes);

    const handleSubmit = (e) => {
        e.preventDefault();
        const order = {
            toName: name,
            toPhone: phone,
            toAddress: address,
            toWardName: wardName,
            toDistrictName: districtName,
            toProvinceName: provinceName,
            note: note,
            listOrderDetail: sizes,
            totalAmount: totalAmount,
            tax: tax,
            shippingCost: shipping,
            totalPay: totalPay,
            paymentMethodType: selectedPaymentMethod,
            account: userId,

        };
        console.log(order);
        fetch('http://localhost:8080/api/v1/user-api/order', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(order),
        }).then((res) => {
            if (res.ok) {
                res.json().then(dataResponse => {
                    console.table(dataResponse);
                    const linkPaypal = dataResponse.linkPaypal;
                    if (linkPaypal !== null) {
                        window.location.href = linkPaypal;
                    }
                });
               //  console.log(res.json())
               navigate('/payment/success')
            }
            else {
                console.log(res)
                navigate('/payment/cancel')
            }
        });
        console.log(order);

    };

    return (
        <div>

            <form className='flex flex-row w-full mt-4 space-x-4  p-4 rounded shadow-lg '
                onSubmit={handleSubmit}>
                <div className='flex flex-col w-1/2 space-y-4  p-4 rounded shadow-lg'>
                    <label htmlFor="name">Name:</label>
                    <input className='w-full p-2 border border-gray-300 rounded mt-1'
                        type="text" id="name" value={name} onChange={handleNameChange} />
                    <label htmlFor="name">phone:</label>
                    <input className='w-full p-2 border border-gray-300 rounded mt-1'
                        type="text" id="phone" value={phone} onChange={handlePhoneChange} />
                    <label htmlFor="name">Address:</label>
                    <input className='w-full p-2 border border-gray-300 rounded mt-1'
                        type="text" id="address" value={address} onChange={handleAddressChange} />
                    <label htmlFor="wardName">Ward:</label>
                    <input className='w-full p-2 border border-gray-300 rounded mt-1'
                        type="text" id="wardName" value={wardName} onChange={handleWardNameChange} />
                    <label htmlFor="districtName">District:</label>
                    <input className='w-full p-2 border border-gray-300 rounded mt-1'
                        type="text" id="districtName" value={districtName} onChange={handleDistrictNameChange} />
                    <label htmlFor="provinceName">Province:</label>
                    <input className='w-full p-2 border border-gray-300 rounded mt-1'
                        type="text" id="provinceName" value={provinceName} onChange={handleProvinceNameChange} />

                    <label htmlFor="note">Note:</label>
                    <textarea className='w-full p-2 border border-gray-300 rounded mt-1'
                        id="note" value={note} onChange={handleNoteChange}></textarea>
                    <div className='w-full '>
                        <PaymentMethods
                            onChange={handlePaymentMethodChange}
                            selectedPaymentMethod={selectedPaymentMethod}
                            onPaymentMethodChange={setSelectedPaymentMethod}
                        />
                    </div>
                </div>
                <div className='w-1/2'>
                    {/* Display Cart Items */}
                    <CartTotals />
                </div>
                <button className='btn bg-blue-600 hover:bg-blue-500 text-white mt-4 w-1/4  p-2 rounded'
                    type="submit">Place Order</button>

            </form>

        </div>
    );
};

export default Checkout;