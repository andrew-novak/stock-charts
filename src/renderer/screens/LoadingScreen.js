import React from "react";
import { CircularProgress, Typography, Button } from "@material-ui/core";

const LoadingScreen = ({ text, buttons }) => (
  <div
    style={{
      height: "100vh",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 24,
    }}
  >
    <CircularProgress size={60} />
    {text && <Typography style={{ fontSize: 20 }}>{text}</Typography>}
    {buttons.map((button, index) => (
      <Button key={index} variant="contained" onClick={button.onClick}>
        {button.label}
      </Button>
    ))}
  </div>
);

export default LoadingScreen;
