import React, { useEffect } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";

import { setStocks, setSelectedStock } from "../actions/general";
import LoadingScreen from "./LoadingScreen";
import Header from "../components/Header";

const Screen = ({ stocks, setStocks, setSelectedStock }) => {
  // get stock symbols
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=PYALSYIJLNMARVK5"
      );
      if (!response.data) return;
      const arr = response.data.split("\n");
      const newStocks = [];
      const headers = arr[0].split(",");
      for (let i = 1; i < arr.length; i += 1) {
        const data = arr[i].split(",");
        const obj = {};
        for (let j = 0; j < data.length; j += 1) {
          obj[headers[j].trim()] = data[j].trim();
        }
        newStocks.push(obj);
      }
      setStocks(newStocks);
    })();
  }, []);

  if (!stocks)
    return (
      <LoadingScreen
        text="Loading Stock Chart"
        button={{
          label: "Refresh",
          onClick: () => window.location.reload(false),
        }}
      />
    );

  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <Header title="Select Stock" />
      <div>
        {stocks.map((stock) => (
          <Button
            key={stock.symbol}
            variant="contained"
            style={{ borderRadius: 0, width: "100%" }}
            onClick={() =>
              stock.symbol &&
              setSelectedStock({ name: stock.name, symbol: stock.symbol })
            }
          >
            {stock.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

const mapState = (state) => {
  const { stocks } = state.general;
  return { stocks };
};

export default connect(mapState, {
  setStocks,
  setSelectedStock,
})(Screen);
