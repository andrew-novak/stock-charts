import axios from "axios";

import { API_KEYS, RETRIES } from "../constants/stocksApi";
import getNewApiKeyIndex from "./getNewApiKeyIndex";

const fetchStocksWithRetries = async (apiKeyIndex, retries) => {
  console.log("starting a LISTING_STATUS request");
  const response = await axios.get(
    `https://www.alphavantage.co/query?function=LISTING_STATUS&apikey=${API_KEYS[apiKeyIndex]}`
  );
  console.log("response:", response);
  // response but no data
  if (!response.data || Object.keys(response.data).length === 0) {
    console.error("no data received");
    if (retries < 1) {
      // no more retries
      return { keyIndex: apiKeyIndex };
    }
    // switch api key, which will cause another fetch attempt
    console.log("switching api key");
    const nextIndex = getNewApiKeyIndex(apiKeyIndex);
    return fetchStocksWithRetries(nextIndex, retries - 1);
  }
  // response with data
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
  return { keyIndex: apiKeyIndex, stocks: newStocks };
};

const fetchStocks = async (apiKeyIndexArg = 0, retries = RETRIES) => {
  let apiKeyIndex = apiKeyIndexArg;
  if (apiKeyIndex === null) {
    apiKeyIndex = 0;
  }

  const { keyIndex, stocks } = await fetchStocksWithRetries(
    apiKeyIndex,
    retries
  );
  return { keyIndex, stocks };
};

export default fetchStocks;
