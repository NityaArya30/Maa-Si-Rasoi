import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { url } from "../assets/assets"; // ✅ make sure url is exported from assets.js

// Create context
export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
    const [kitchens, setKitchens] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch kitchens from backend
    const fetchKitchens = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${url}/api/kitchen/listKitchen`); // ✅ endpoint to list kitchens
            if (response.data.success) {
                setKitchens(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching kitchens:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchKitchens();
    }, []);

    return (
        <StoreContext.Provider value={{ kitchens, loading }}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
