import React, { useState, useEffect } from "react";
import axios from "axios";
import CanvasJSReact from "@canvasjs/react-stockcharts";
import { connect } from "react-redux";

import { setDataPoints, unselectStock } from "../actions/general";
import LoadingScreen from "./LoadingScreen";
import Header from "../components/Header";

const { /* CanvasJS, */ CanvasJSStockChart } = CanvasJSReact;

const DisplayStockScreen = ({
  selectedStock,
  dataPoints,
  setDataPoints,
  unselectStock,
}) => {
  // get data points
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${selectedStock.symbol}&apikey=PYALSYIJLNMARVK5`
      );
      const { data } = response;

      if (!data["Weekly Time Series"]) return;

      const entries = Object.entries(data["Weekly Time Series"]);
      const initialAccumulator = {
        chart: [],
        navigator: [],
      };
      const newDataPoints = entries.reduce(
        (accumulator, [date, obj]) => ({
          chart: [
            ...accumulator.chart,
            {
              x: new Date(date),
              y: [
                Number(obj["1. open"]),
                Number(obj["2. high"]),
                Number(obj["3. low"]),
                Number(obj["4. close"]),
              ],
            },
          ],
          navigator: [
            ...accumulator.navigator,
            {
              x: new Date(date),
              y: Number(obj["4. close"]),
            },
          ],
        }),
        initialAccumulator
      );

      setDataPoints(newDataPoints);
    })();
  });

  if (!dataPoints)
    return (
      <LoadingScreen
        text="Loading Stock Chart"
        button={{ label: "Go to home screen", onClick: unselectStock }}
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
                  dataPoints: dataPoints.chart,
                },
              ],
              navigator: [{ dataPoints: dataPoints.navigator }],
            },
          ],
        }}
      />
    </div>
  );
};

const mapState = (state) => {
  const { selectedStock, dataPoints } = state.general;
  return { selectedStock, dataPoints };
};

export default connect(mapState, { setDataPoints, unselectStock })(
  DisplayStockScreen
);
