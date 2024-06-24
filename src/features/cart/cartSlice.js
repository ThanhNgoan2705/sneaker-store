// cart.js

import { toast } from "react-toastify";

const CART_KEY = 'cart';

const getCart = () => {
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : { items: [], total: 0 };
};

const saveCart = (cart) => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

const addToCart = (product) => {
    console.log(product);
    console.log(product.productData);
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
        return;
    }
    const cartItems = getCart();
    console.log(cartItems);
    const existingProduct = cartItems.findIndex((item) => item.productId === product.productData.id && item.size.id=== product.size.id);
    if (existingProduct >= 0) {
        cartItems.quantity += product.quantity;
        toast.success("Product added amount to cart");
    }
    else {
        cartItems.push({ productId:product.productData.id, quantity: product.quantity, size: product.size});
        toast.success("Product added to cart");
    }
    cartItems.total = calculateTotals(cartItems);
    saveCart(cartItems);
};

const removeFromCart = (productId) => {
    let cart = getCart();
    const existingProductIndex = cart.findIndex((item) => item.id === productId);
    if (existingProductIndex >= 0) {
        cart.totalQuantity -= cart[existingProductIndex].quantity;
        cart = cart.filter((item) => item.id !== productId);
    }
    saveCart(cart);
};

const updateCartAmount = (product, quantity) => {
    console.log(product);
    console.log("quantity" + quantity);
    const cart = getCart();
    const productIndex = cart.findIndex((item) => item.id === product.id);
    if (productIndex >= 0) {
        product.quantity = quantity;
        saveCart(cart);
        toast.success("Cart updated");
    }
};
const calculateTotals = (cart) => {
    console.log(cart);
    return cart.reduce((total, item) => total + item.size.price * item.quantity, 0);
};

const clearCart = () => {
    localStorage.removeItem(CART_KEY);
};

export { addToCart, removeFromCart, updateCartAmount, getCart, clearCart, calculateTotals };