import React from "react";
import { Provider as StoreProvider } from "react-redux";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { render } from "react-dom";

import store from "./store";
import theme from "./theme";
import Screen from "./Screen";
import ConsecutiveSnackbars from "./components/ConsecutiveSnackbars";

const App = () => (
  <StoreProvider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Screen />
      <ConsecutiveSnackbars />
    </MuiThemeProvider>
  </StoreProvider>
);

render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
