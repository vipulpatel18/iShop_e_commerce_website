import { createSlice } from "@reduxjs/toolkit";

// Initial cart state is fetched from localStorage for persistence.
const initialState = {
    items: JSON.parse(localStorage.getItem("cart_items")) || [],
    total: Number(localStorage.getItem("cart_total")) || 0,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // Action to add a product to the cart or update its quantity if it exists.
        addToCart: (state, action) => {
            const { product_id, price } = action.payload;
            const existingProduct = state.items.find((item) => item.product_id === product_id);

            if (existingProduct) {
                existingProduct.quantity++; // Increment quantity if product already in the cart.
            } else {
                state.items.push({ ...action.payload, quantity: 1 }); // Add new product to the cart.
            }

            state.total += price; // Update total price.
            updateLocalStorage(state); // Persist state to localStorage.
        },

        // Action to remove a product from the cart.
        removeFromCart: (state, action) => {
            const { product_id } = action.payload;
            const product = state.items.find((item) => item.product_id === product_id);

            if (product) {
                state.total -= product.quantity * product.price; // Adjust total price.
                state.items = state.items.filter((item) => item.product_id !== product_id); // Remove product.
                updateLocalStorage(state); // Persist state to localStorage.
            }
        },

        // Action to adjust product quantity in the cart.
        adjustQuantity: (state, action) => {
            const { product_id, increment, price } = action.payload;
            const product = state.items.find((item) => item.product_id === product_id);

            if (product) {
                product.quantity += increment ? 1 : -1; // Increment or decrement quantity.

                // Ensure quantity does not fall below 1.
                if (product.quantity < 1) product.quantity = 1;

                // Adjust total price.
                state.total += increment ? price : -price;
                updateLocalStorage(state); // Persist state to localStorage.
            }
        },
        emtyCart: (state, { payload }) => {
            state.data = []
            state.total = 0
            original_price = 0
            localStorage.removeItem("cartItem")
            localStorage.removeItem("total");
            localStorage.removeItem("original_price");


        },
    },
});

// Helper function to update localStorage.
const updateLocalStorage = (state) => {
    localStorage.setItem("cart_items", JSON.stringify(state.items));
    localStorage.setItem("cart_total", state.total);
};


export const { addToCart, removeFromCart, adjustQuantity } = cartSlice.actions;
export default cartSlice.reducer;
