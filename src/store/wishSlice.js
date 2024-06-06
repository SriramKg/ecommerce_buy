import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishList : []
}

export const wishSlice = createSlice( {
    name : "wish",
    initialState,
    reducers : {
        addToWish : (state, action) => {
            state.wishList.push(action.payload);
        },
        alreadyWishListed : (state, action) => {
            const index = state.wishList.findIndex((wish) => wish.product.id === action.payload.product.id);
            if(index !== -1){
                alert('Already Wishlisted Broo');
            }
        },
        deleteFromWish : (state, action) => {
            state.wishList = state.wishList.filter((wish) => wish.product.id !== action.payload.product.id);
        }
    }
})

export const {addToWish, alreadyWishListed, deleteFromWish} = wishSlice.actions;

export default wishSlice.reducer;