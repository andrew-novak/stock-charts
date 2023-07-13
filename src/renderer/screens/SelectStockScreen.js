import React, { useState, useEffect } from "react";
import axios from "axios";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import { Button } from "@material-ui/core";
import { connect } from "react-redux";

import { setStocks, setSelectedStock } from "../actions/general";
import LoadingScreen from "./LoadingScreen";
import Header from "../components/Header";

const Screen = ({ stocks, setStocks, setSelectedStock }) => {
  const [searchInput, setSearchInput] = useState("");

  // get stock symbols
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        "https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=PYALSYIJLNMARVK5"
      );
      if (!response.data || Object.keys(response.data).length === 0) return;

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

  const filteredStocks = searchInput
    ? stocks.filter(
        (stock) =>
          (stock.name || "")
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          (stock.symbol || "").toLowerCase().includes(searchInput.toLowerCase())
      )
    : stocks;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Header
        title="Select Stock"
        searchInput={searchInput}
        onSearchInput={(event) => setSearchInput(event.target.value)}
      />

      <AutoSizer>
        {({ height, width }) => (
          <FixedSizeList
            style={{ marginTop: "64px" }}
            height={height - 64}
            width={width}
            itemSize={50}
            itemCount={filteredStocks.length}
          >
            {({ index, style }) => (
              <Button
                key={filteredStocks[index].symbol}
                variant="contained"
                style={{
                  height: 50,
                  borderRadius: 0,
                  width: "100%",
                  justifyContent: "flex-start",
                  ...style,
                }}
                onClick={() =>
                  filteredStocks[index].symbol &&
                  setSelectedStock({
                    name: filteredStocks[index].name,
                    symbol: filteredStocks[index].symbol,
                  })
                }
              >
                {filteredStocks[index].name}
              </Button>
            )}
          </FixedSizeList>
        )}
      </AutoSizer>
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
