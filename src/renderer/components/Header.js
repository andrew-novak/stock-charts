import React from "react";
import {
  useTheme,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Box,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const Header = ({ onBack, title }) => {
  const theme = useTheme();
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          {onBack && (
            <IconButton size="large" edge="start" onClick={onBack}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography
            variant="h6"
            align={onBack && "right"}
            style={{ flexGrow: 1 }}
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={theme.mixins.toolbar} />
    </>
  );
};

export default Header;
