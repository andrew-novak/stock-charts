import { API_KEYS } from "../constants/stocksApi";
import getNextIndex from "./getNextIndex";

const getNewApiKeyIndex = (currentIndex) => {
  console.log("getNewApiKeyIndex action started");
  let apiKeyIndex;

  // == used on purpose (null/undefined)
  if (currentIndex == null) {
    apiKeyIndex = 0;
  }

  // != used on purpose (null/undefined)
  if (currentIndex != null) {
    apiKeyIndex = getNextIndex(API_KEYS, currentIndex);
  }

  return apiKeyIndex;
};

export default getNewApiKeyIndex;
