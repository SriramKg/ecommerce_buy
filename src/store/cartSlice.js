import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItem: [],
}

export const cartSlice = createSlice( {
    name: 'cart',
    initialState,
    reducers : {
        addToCart : (state, action) => {
            state.cartItem.push(action.payload);
        },
        updateToCart : (state, action) => {
            const index = state.cartItem.findIndex((item) => item.product.id === action.payload.product.id);
            if(index !== -1){
                state.cartItem[index] = action.payload;
            }
        },
        deleteAProduct : (state, action) => {
            state.cartItem = state.cartItem.filter((item) => item.product.id !== action.payload.product.id);
        }
    }
})

export const { addToCart,updateToCart,deleteAProduct } = cartSlice.actions;

export default cartSlice.reducer;