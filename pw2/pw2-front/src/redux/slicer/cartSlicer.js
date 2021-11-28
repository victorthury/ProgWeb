import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  produtos: [],
  loginPosTelaCompra: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    appendItem: (state, action) => {
      return {
        ...state,
        produtos: [...state.produtos, action.payload]
      }
      // state.push(action.payload);
    },
    updateCart: (state, action) => {
      const index = state.produtos.findIndex(item => item.id !== action.payload)
      state.produtos[index].quantidade += action.payload
    },
    removeItem: (state, action) => {
      const filteredCart = state.produtos.filter(item => item.id !== action.payload);
      return {
        ...state,
        produtos: filteredCart
      }
    },
    clearCart: state => initialState,
    loginAfterCart: (state, action) => {
      return {
        ...state,
        loginPosTelaCompra: action.payload,
      }
    }
  }
});

export const { appendItem, clearCart, removeItem, updateCart, loginAfterCart } = cartSlice.actions;
export default cartSlice.reducer
