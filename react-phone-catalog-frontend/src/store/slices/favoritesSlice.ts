import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../api/productsApi';

type FavoritesState = Product[];

const initialState: FavoritesState = [];

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Product>) => {
      if (!state.find(product => product.id === action.payload.id)) {
        state.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      return state.filter(product => product.id !== action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<Product>) => {
      const index = state.findIndex(
        product => product.id === action.payload.id,
      );
      if (index === -1) {
        state.push(action.payload);
      } else {
        state.splice(index, 1);
      }
    },
  },
});

export const { addToFavorites, removeFromFavorites, toggleFavorite } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
