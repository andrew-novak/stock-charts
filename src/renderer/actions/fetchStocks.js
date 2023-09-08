import { SET_API_KEY_INDEX, SET_STOCKS } from "../constants/actionTypes";

import fetchStocksHelper from "../helpers/fetchStocks";

const fetchStocks = (apiKeyIndex) => async (dispatch) => {
  try {
    const { keyIndex, stocks } = await fetchStocksHelper(apiKeyIndex);
    dispatch({ type: SET_API_KEY_INDEX, apiKeyIndex: keyIndex });
    if (stocks) {
      dispatch({ type: SET_STOCKS, stocks });
    }
  } catch (error) {
    console.error("Error fetching stocks:", error);
  }
};

export default fetchStocks;
