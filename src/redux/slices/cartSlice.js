import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,
    cartCourseArray: localStorage.getItem("cartCourseArray") ? JSON.parse(localStorage.getItem("cartCourseArray")) : [],
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        addToCart(state, value) {

            // const index = state.cart.findIndex((ele) => ele._id === course._id);
            if(state.cart.length !== 0 && state.cart.some((ele) => ele._id === value.payload._id)) {
                toast.error("Course already in the cart!");
                return;
            }

            state.cart.push(value.payload);
            toast.success("Course added to the cart!");
            state.totalItems++;
            state.total += Number(value.payload.price);
            state.cartCourseArray.push(value.payload._id);

            //updating to localStorage
            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            localStorage.setItem("cartCourseArray", JSON.stringify(state.cartCourseArray));

            toast.success("Course added to cart");
        },

        removeFromCart(state, value) {

            if(state.cart.length === 0 || !state.cart.some((ele) => ele._id === value.payload._id)) {
                toast.error("Item already not inside the cart!");
                return;
            }

            state.total -= value.payload.price;
            state.totalItems = state.totalItems - 1;
            state.cart = state.cart.filter((ele, index) => ele._id !== value.payload._id);
            state.cartCourseArray = state.cartCourseArray.filter((ele) => ele !== value.payload._id)

            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            localStorage.setItem("cartCourseArray", JSON.stringify(state.cartCourseArray));

            toast.success("Item removed from cart");

        },

        resetCart(state) {

            state.cart = [];
            state.total = 0;
            state.totalItems = 0;
            state.cartCourseArray = [];

            localStorage.removeItem("cart");
            localStorage.removeItem("total");
            localStorage.removeItem("totalItems");
            localStorage.removeItem("cartCourseArray");

        }
    }
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;