import { useEffect } from "react";
import CartItem from "./CartItem";

const CartContainer = () => {
    const [cartItems, setCartItems] = useState([]);
    const storedCart = localStorage.getItem('cart');
   
    useEffect(() => {
        const cartItems = storedCart ? JSON.parse(storedCart) : [];
        setCartItems(cartItems);
    }, []);
    return (
        <div>
            {cartItems.map((item) => (
                <CartItem key={item.id} cartItem={item}/>
            ))}
        </div>
    )
}
export default CartContainer;