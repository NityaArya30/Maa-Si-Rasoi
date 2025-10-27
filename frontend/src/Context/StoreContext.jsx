import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { url } from "../assets/assets";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
    const [food_list, setFoodList] = useState([]);
    const [kitchens, setKitchens] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState(localStorage.getItem("token") || ""); // ✅ add token state
    const currency = "₹";

    // ✅ Fetch food items
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success) {
                setFoodList(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    // ✅ Fetch kitchens
    const fetchKitchens = async () => {
        try {
            const response = await axios.get(`${url}/api/kitchen/listKitchen`);
            if (response.data.success) {
                setKitchens(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching kitchens:", error);
        }
    };

    // ✅ Add item to cart
    const addToCart = (id) => {
        setCartItems((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1,
        }));
    };

    // ✅ Remove item from cart
    const removeFromCart = (id) => {
        setCartItems((prev) => {
            if (!prev[id]) return prev;
            const updated = { ...prev };
            if (updated[id] > 1) updated[id] -= 1;
            else delete updated[id];
            return updated;
        });
    };

    // ✅ Calculate total cart amount
    const getTotalCartAmount = () => {
        let total = 0;
        for (const itemId in cartItems) {
            const item = food_list.find((food) => food._id === itemId);
            if (item) {
                total += item.price * cartItems[itemId];
            }
        }
        return total;
    };

    // ✅ Load cart data after login/register
    const loadCartData = async ({ token }) => {
        try {
            const response = await axios.get(`${url}/api/cart/get`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) {
                setCartItems(response.data.cartItems || {});
            }
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    useEffect(() => {
        fetchFoodList();
        fetchKitchens();
    }, []);

    const contextValue = {
        url,
        currency,
        food_list,
        kitchens,
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,      // ✅ make token available
        setToken,   // ✅ make setToken available
        loadCartData, // ✅ make loadCartData available
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
