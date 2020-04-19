import React from "react";
import { makeStyles } from "@material-ui/core";
import { LoopOutlined } from "@material-ui/icons";

const useStyles = makeStyles({
  loaderContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  "@keyframes spinner": {
    "100%": {
      transform: "rotate(-360deg)",
    },
  },
  loader: {
    position: "fixed",
    left: "50%",
    top: "50%",
    fontSize: "100px",
    animation: "$spinner 2s linear infinite",
  },
});
const Loader = () => {
  const classes = useStyles();
  return (
    <div className={classes.loaderContainer}>
      <LoopOutlined className={classes.loader} />
    </div>
  );
};
export default Loader;
