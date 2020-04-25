import React from "react";
import {
  Button,
  makeStyles,
  Theme,
  CircularProgress,
  ExtendButtonBase,
  ButtonTypeMap,
  ButtonProps,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
    display: "inline-block",
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
  },
}));

interface Props extends ButtonProps {
  isLoading: boolean;
}

const AsyncButton: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Button
        color={props.color}
        autoFocus
        variant={props.variant}
        onClick={props.onClick}
        disabled={props.isLoading}
      >
        {props.children}
      </Button>
      {props.isLoading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};

export default AsyncButton;
