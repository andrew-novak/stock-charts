import React, { useEffect } from "react";
import { connect } from "react-redux";

import fetchStocks from "./actions/fetchStocks";
import DisplayStockScreen from "./screens/DisplayStockScreen";
import SelectStockScreen from "./screens/SelectStockScreen";

const Routes = ({ apiKeyIndex, selectedStock, fetchStocks }) => {
  useEffect(() => {
    fetchStocks(apiKeyIndex);
  }, []);

  if (selectedStock) {
    return <DisplayStockScreen />;
  }
  return <SelectStockScreen />;
};

const mapState = (state) => {
  const { apiKeyIndex, selectedStock, dataPoints } = state.general;
  return { apiKeyIndex, selectedStock, dataPoints };
};

export default connect(mapState, { fetchStocks })(Routes);
