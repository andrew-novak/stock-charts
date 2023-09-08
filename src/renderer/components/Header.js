import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  useTheme,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import icon from "../assets/icon_64x64.png";
import SearchBar from "./SearchBar";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const Header = ({ onBack, title, searchInput, onSearchInput }) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {onBack && (
            <IconButton
              size="medium"
              edge="start"
              color="inherit"
              sx={{ flexShrink: 0, height: "48px", width: "48px" }}
              onClick={onBack}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <div
            style={{
              height: 48,
              width: 52,
              flex: "0 0 auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              borderRadius: 10,
              overflow: "hidden",
              marginRight: 8,
            }}
          >
            <img src={icon} style={{ height: 60, width: 60 }} />
          </div>
          {title && (
            <Typography variant="h6" style={{ flexGrow: !onSearchInput && 1 }}>
              {title}
            </Typography>
          )}
          {!!onSearchInput && (
            <SearchBar
              searchInput={searchInput}
              onSearchInput={onSearchInput}
            />
          )}
        </Toolbar>
      </AppBar>
      <Box sx={theme.mixins.toolbar} />
    </>
  );
};

export default Header;
