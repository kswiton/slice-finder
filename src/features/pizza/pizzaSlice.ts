import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface PizzaState {
  ingredients: string[];
}

const initialState: PizzaState = {
  ingredients: [],
};

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient !== action.payload
      );
    },
    removeAllIngredients: (state) => {
      state.ingredients = [];
    },
  },
});

export const { addIngredient, removeIngredient, removeAllIngredients } =
  pizzaSlice.actions;

export const selectIngredients = (state: RootState) => state.pizza.ingredients;

export default pizzaSlice.reducer;
