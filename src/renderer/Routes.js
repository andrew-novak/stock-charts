import React from "react";
import { connect } from "react-redux";

import DisplayStockScreen from "./screens/DisplayStockScreen";
import SelectStockScreen from "./screens/SelectStockScreen";

const Routes = ({ selectedStock }) => {
  if (selectedStock) {
    return <DisplayStockScreen />;
  }
  return <SelectStockScreen />;
};

const mapState = (state) => {
  const { stocks, selectedStock, dataPoints } = state.general;
  return { stocks, selectedStock, dataPoints };
};

export default connect(mapState)(Routes);
