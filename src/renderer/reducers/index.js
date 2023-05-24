import { combineReducers } from "redux";

import general from "./general";
import snackbars from "./snackbars";

const rootReducer = combineReducers({
  general,
  snackbars,
});

export default rootReducer;
