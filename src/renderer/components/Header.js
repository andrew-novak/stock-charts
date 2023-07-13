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
              onClick={onBack}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            align={onBack && "right"}
            style={{ flexGrow: !onSearchInput && 1 }}
          >
            {title}
          </Typography>
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
