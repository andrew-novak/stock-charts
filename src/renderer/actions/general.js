import { SET_SELECTED_STOCK, UNSELECT_STOCK } from "../constants/actionTypes";

export const setSelectedStock = (selectedStock) => (dispatch) =>
  dispatch({ type: SET_SELECTED_STOCK, selectedStock });

export const unselectStock = () => (dispatch) =>
  dispatch({ type: UNSELECT_STOCK });
