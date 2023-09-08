import axios from "axios";

import { API_KEYS, RETRIES } from "../constants/stocksApi";
import getNewApiKeyIndex from "./getNewApiKeyIndex";

const fetchStockWithRetries = async (apiKeyIndex, selectedStock, retries) => {
  console.log("starting a TIME_SERIES_WEEKLY request");
  const response = await axios.get(
    `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${selectedStock.symbol}&apikey=${API_KEYS[apiKeyIndex]}`
  );
  console.log("response:", response);

  // response but no data
  if (!response.data || !response.data["Weekly Time Series"]) {
    console.error("no data received");
    if (retries < 1) {
      // no more retries
      return { keyIndex: apiKeyIndex };
    }
    // switch api key, which will cause another fetch attempt
    const nextIndex = getNewApiKeyIndex(apiKeyIndex);
    return fetchStockWithRetries(nextIndex, selectedStock, retries - 1);
  }

  // response with data
  const entries = Object.entries(response.data["Weekly Time Series"]);
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

  return { keyIndex: apiKeyIndex, dataPoints: newDataPoints };
};

const fetchStock = async (apiKeyIndexArg = 0, retries = RETRIES) => {
  let apiKeyIndex = apiKeyIndexArg;
  if (apiKeyIndex === null) {
    apiKeyIndex = 0;
  }

  const { keyIndex, dataPoints } = await fetchStockWithRetries(
    apiKeyIndex,
    retries
  );
  return { keyIndex, dataPoints };
};

export default fetchStock;
