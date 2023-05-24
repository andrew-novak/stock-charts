import {
  SET_STOCKS,
  SET_SELECTED_STOCK,
  SET_DATA_POINTS,
  UNSELECT_STOCK,
} from "../constants/actionTypes";

const initialState = {
  stocks: null,
  selectedStock: null,
  dataPoints: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
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

    case SET_DATA_POINTS:
      return {
        ...state,
        dataPoints: action.dataPoints,
      };

    case UNSELECT_STOCK:
      console.log("ELO");
      return {
        ...state,
        selectedStock: null,
        dataPoints: null,
      };

    default:
      return state;
  }
};
