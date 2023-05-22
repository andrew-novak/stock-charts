import React, { useState, useEffect } from "react";
import axios from "axios";
import CanvasJSReact from "@canvasjs/react-stockcharts";

const { CanvasJS, CanvasJSStockChart } = CanvasJSReact;

const Screen = () => {
  const [dataPoints, setDataPoints] = useState({ chart: [], navigator: [] });

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=PYALSYIJLNMARVK5"
      );
      const { data } = response;

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
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        backgroundColor: "lightblue",
      }}
    >
      <div style={{ width: "200px", backgroundColor: "green" }}>Left Panel</div>
      <div style={{ width: "100%", backgroundColor: "white" }}>
        <CanvasJSStockChart
          containerProps={{
            height: "600px",
            width: "80%",
            margin: "auto",
          }}
          options={{
            // title: "Stock Chart",
            subtitles: [{ text: "IBM" }],
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
              },
            ],
          }}
        />
      </div>
    </div>
  );

  /*
  return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          backgroundColor: "lightblue",
        }}
      >
        <div style={{ width: "200px", backgroundColor: "green" }}>
          Left Panel
        </div>
        <div style={{ width: "100%", backgroundColor: "white" }}>
          {dataPoints.chart.length > 0 && (
            <CanvasJSStockChart
              containerProps={{
                height: "600px",
                width: "80%",
                margin: "auto",
                padding: "1px",
              }}
              options={{
                title: "Stock Chart",
                subtitles: [{ text: "IBM" }],
                charts: [
                  {
                    data: [
                      {
                        type: "candlestick",
                        yValueFormatString: "$#,###.##",
                        dataPoints: dataPoints.chart,
                      },
                    ],
                  },
                ],
              }}
            />
          )}
        </div>
      </div>
    );
    */
};

export default Screen;
