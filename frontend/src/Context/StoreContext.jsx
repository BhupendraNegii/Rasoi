import { createContext, useEffect, useState } from "react";
import axios from 'axios'



export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {

    const url = "http://localhost:5001";


    const [cardItem, setCardItem] = useState({});
    const [token, setToken] = useState('');
    const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        // Normalize itemId to string for consistency
        const normalizedId = String(itemId);
        // Check both normalized and original ID format
        const currentQty = cardItem[normalizedId] || cardItem[itemId] || 0;
        const previousQuantity = currentQty;
        
        setCardItem((prev) => {
            const newCart = { ...prev };
            // Remove old key if it exists with different format (number vs string)
            if (prev[itemId] && itemId !== normalizedId) {
                delete newCart[itemId];
            }
            newCart[normalizedId] = currentQty + 1;
            return newCart;
        });
        
        if(token){
            try {
                await axios.post(`${url}/api/cart/add`, {itemId: normalizedId} , {headers : {token : token}});
                console.log("add")
            } catch (error) {
                console.error("Error adding to cart:", error);
                // Revert the optimistic update on error
                setCardItem((prev) => {
                    const newCart = { ...prev };
                    delete newCart[normalizedId];
                    if (previousQuantity > 0) {
                        // Restore previous quantity, checking both formats
                        if (itemId !== normalizedId && prev[itemId] === undefined) {
                            newCart[itemId] = previousQuantity;
                        } else {
                            newCart[normalizedId] = previousQuantity;
                        }
                    }
                    return newCart;
                });
            }
        }
    }

    const removeFromCart = async (itemId) => {
        // Normalize itemId to string for consistency
        const normalizedId = String(itemId);
        // Check both normalized and original ID format
        const currentQty = cardItem[normalizedId] || cardItem[itemId] || 0;
        const previousQuantity = currentQty;
        
        if (currentQty > 0) {
            setCardItem((prev) => {
                const newCart = { ...prev };
                // Remove old key if it exists with different format (number vs string)
                if (prev[itemId] && itemId !== normalizedId) {
                    delete newCart[itemId];
                }
                if (currentQty > 1) {
                    newCart[normalizedId] = currentQty - 1;
                } else {
                    delete newCart[normalizedId];
                }
                return newCart;
            });
        }
        if(token){
            try {
                await axios.post(`${url}/api/cart/remove` , {itemId: normalizedId} , {headers : {token : token}});
                console.log("remove")
            } catch (error) {
                console.error("Error removing from cart:", error);
                // Revert the optimistic update on error
                setCardItem((prev) => {
                    const newCart = { ...prev };
                    delete newCart[normalizedId];
                    if (previousQuantity > 0) {
                        // Restore previous quantity, checking both formats
                        if (itemId !== normalizedId && prev[itemId] === undefined) {
                            newCart[itemId] = previousQuantity;
                        } else {
                            newCart[normalizedId] = previousQuantity;
                        }
                    }
                    return newCart;
                });
            }
        }
    }




    const getCartTotal = () => {

        let TotalAmount = 0;
        for (const items in cardItem) {
            if (cardItem[items] > 0) {
                // Try to find item by _id or id, handling both string and number types
                let itemInfo = food_list.find((product) => {
                    // Convert both to strings for comparison to handle type mismatches
                    const productId = String(product._id || product.id || '');
                    const cartItemId = String(items);
                    return productId === cartItemId || 
                           product._id === items || 
                           product.id === items;
                });

                if (itemInfo && itemInfo.price) {
                    TotalAmount += Number(itemInfo.price) * Number(cardItem[items]);
                }
            }
        }

        return TotalAmount;

    }

    const fetchFoodList = async () => {
        const respose = await axios.get(`${url}/api/food/list`);

        setFoodList(respose.data.foodItem)

    }

    const fetchCartData = async (token)=>{
        
        try {
            // console.log("Token being sent:", token);
            const response = await axios.get(`${url}/api/cart/get`, {
                headers: { token: token },
            });
            // console.log("Response from getCart:", response.data);
            const cartData = response.data.cart || {};
            // Normalize cart data - ensure all keys are strings for consistency
            const normalizedCart = {};
            for (const key in cartData) {
                if (cartData[key] > 0) {
                    normalizedCart[String(key)] = cartData[key];
                }
            }
            setCardItem(normalizedCart);
        } catch (error) {
            console.error("Error loading cart data: ", error);
        }
    
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList(); // Fetch food items
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                fetchCartData(storedToken)
            }
        }
        loadData();
    }, []);






    const contextValue = {
        url,
        cardItem,
        setCardItem,
        addToCart,
        removeFromCart,
        food_list,
        getCartTotal,
        token,
        setToken

    };




    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;



