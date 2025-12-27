import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../api/productsApi';

const loadFavouritesFromStorage = (): Product[] => {
  try {
    const serializedState = localStorage.getItem('favorites');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (error) {
    return [];
  }
};

const saveFavoritesToStorage = (state: Product[]) => {
  try {
    localStorage.setItem('favorites', JSON.stringify(state));
  } catch (error) {
    console.log('Failed to save to Storage', error);
  }
};

const initialState: Product[] = loadFavouritesFromStorage();

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Product>) => {
      if (!state.find(product => product.id === action.payload.id)) {
        state.push(action.payload);
      }
      saveFavoritesToStorage(state);
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      const newState = state.filter(product => product.id !== action.payload);
      saveFavoritesToStorage(newState);
      return newState;
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
      saveFavoritesToStorage(state);
    },
  },
});

export const { addToFavorites, removeFromFavorites, toggleFavorite } =
  favoritesSlice.actions;
export default favoritesSlice.reducer;
