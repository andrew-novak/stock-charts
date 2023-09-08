import {
  SET_API_KEY_INDEX,
  SET_STOCKS,
  SET_STOCK_DATA_POINTS,
  SET_SELECTED_STOCK,
  UNSELECT_STOCK,
} from "../constants/actionTypes";

const initialState = {
  apiKeyIndex: 0,
  stocks: null,
  selectedStock: null,
  stockDataPoints: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_API_KEY_INDEX:
      return {
        ...state,
        apiKeyIndex: action.apiKeyIndex,
      };

    case SET_STOCKS:
      return {
        ...state,
        stocks: action.stocks,
      };

    case SET_SELECTED_STOCK:
      return {
        ...state,
        selectedStock: action.selectedStock,
      };

    case SET_STOCK_DATA_POINTS:
      return {
        ...state,
        stockDataPoints: action.stockDataPoints,
      };

    case UNSELECT_STOCK:
      return {
        ...state,
        selectedStock: null,
        dataPoints: null,
      };

    default:
      return state;
  }
};
