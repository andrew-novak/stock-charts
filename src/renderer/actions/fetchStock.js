import {
  SET_API_KEY_INDEX,
  SET_STOCK_DATA_POINTS,
} from "../constants/actionTypes";

import fetchStockHelper from "../helpers/fetchStock";

const fetchStock = (apiKeyIndex, selectedStock) => async (dispatch) => {
  try {
    const { keyIndex, dataPoints } = await fetchStockHelper(
      apiKeyIndex,
      selectedStock
    );
    dispatch({ type: SET_API_KEY_INDEX, apiKeyIndex: keyIndex });
    if (dataPoints) {
      dispatch({ type: SET_STOCK_DATA_POINTS, stockDataPoints: dataPoints });
    }
  } catch (error) {
    console.error("Error fetching a stock:", error);
  }
};

export default fetchStock;
