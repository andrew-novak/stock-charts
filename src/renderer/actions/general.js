import {
  SET_STOCKS,
  SET_SELECTED_STOCK,
  SET_DATA_POINTS,
  UNSELECT_STOCK,
} from "../constants/actionTypes";

export const setStocks = (stocks) => (dispatch) =>
  dispatch({ type: SET_STOCKS, stocks });

export const setSelectedStock = (selectedStock) => (dispatch) =>
  dispatch({ type: SET_SELECTED_STOCK, selectedStock });

export const setDataPoints = (dataPoints) => (dispatch) =>
  dispatch({ type: SET_DATA_POINTS, dataPoints });

export const unselectStock = () => (dispatch) =>
  dispatch({ type: UNSELECT_STOCK });
