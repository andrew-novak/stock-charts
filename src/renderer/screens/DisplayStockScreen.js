import React, { useEffect } from "react";
import CanvasJSReact from "@canvasjs/react-stockcharts";
import { connect } from "react-redux";

import fetchStock from "../actions/fetchStock";
import { unselectStock } from "../actions/general";
import LoadingScreen from "./LoadingScreen";
import Header from "../components/Header";

const { /* CanvasJS, */ CanvasJSStockChart } = CanvasJSReact;

const DisplayStockScreen = ({
  apiKeyIndex,
  selectedStock,
  stockDataPoints,
  fetchStock,
  unselectStock,
}) => {
  // get data points
  useEffect(() => {
    fetchStock(apiKeyIndex, selectedStock);
  }, []);

  if (!stockDataPoints)
    return (
      <LoadingScreen
        text="Loading Stock Chart"
        buttons={[{ label: "Go to home screen", onClick: unselectStock }]}
      />
    );

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "white",
      }}
    >
      <Header
        title={`${selectedStock.name} (${selectedStock.symbol})`}
        onBack={unselectStock}
      />
      <CanvasJSStockChart
        containerProps={{
          height: "600px",
          width: "80%",
          margin: "auto",
        }}
        options={{
          // title: "Stock Chart", <-- doesnt work with this option
          // subtitles: [{ text: selectedStock }],
          charts: [
            {
              axisX: {
                crosshair: {
                  enabled: true,
                  snapToDataPoint: true,
                },
              },

              data: [
                {
                  type: "candlestick",
                  yValueFormatString: "$#,###.##",
                  dataPoints: stockDataPoints.chart,
                },
              ],
              navigator: [{ dataPoints: stockDataPoints.navigator }],
            },
          ],
        }}
      />
    </div>
  );
};

const mapState = (state) => {
  const { apiKeyIndex, selectedStock, stockDataPoints } = state.general;
  return { apiKeyIndex, selectedStock, stockDataPoints };
};

export default connect(mapState, { fetchStock, unselectStock })(
  DisplayStockScreen
);
