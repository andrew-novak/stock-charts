import React, { useState, useEffect } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import { useMediaQuery, Button } from "@material-ui/core";
import { connect } from "react-redux";

import fetchStocks from "../actions/fetchStocks";
import { setSelectedStock, unselectStock } from "../actions/general";
import LoadingScreen from "./LoadingScreen";
import Header from "../components/Header";

const Screen = ({ apiKeyIndex, stocks, fetchStocks, setSelectedStock }) => {
  const [searchInput, setSearchInput] = useState("");

  const biggerThan600px = useMediaQuery("(min-width:600px)");

  const filteredStocks = searchInput
    ? (stocks || []).filter(
        (stock) =>
          (stock.name || "")
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          (stock.symbol || "").toLowerCase().includes(searchInput.toLowerCase())
      )
    : stocks;

  if (!stocks)
    return (
      <LoadingScreen
        text="Loading Stock Charts"
        buttons={[
          {
            label: "Refresh",
            onClick: () => fetchStocks(apiKeyIndex),
          },
        ]}
      />
    );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Header
        title={biggerThan600px && "Select Stock"}
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
  const { apiKeyIndex, stocks } = state.general;
  return { apiKeyIndex, stocks };
};

export default connect(mapState, {
  fetchStocks,
  setSelectedStock,
  unselectStock,
})(Screen);
