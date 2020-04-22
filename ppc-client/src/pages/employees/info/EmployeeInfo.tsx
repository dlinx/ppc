import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  reviewForm: {
    padding: "20px",
    width: "400px",
    margin: "auto",
    marginTop: "20px",
  },
});

interface RouteParams {
  id: string;
}
interface Props extends RouteComponentProps<RouteParams> {}

const EmployeeInfo: React.FC<Props> = (props) => {
  const classes = useStyles();
  return <Paper className={classes.reviewForm}></Paper>;
};
export default EmployeeInfo;
