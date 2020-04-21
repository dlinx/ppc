import React, { useState } from "react";
import {
  Paper,
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography,
  ExpansionPanelDetails,
  makeStyles,
  Theme,
} from "@material-ui/core";
import ReviewForm from "../../components/ReviewRating/ReviewRating";
import { ExpandMore } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: "700px",
    margin: "auto",
    marginTop: "10px",
    padding: "20px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: "bold",
  },
}));

interface Props {}
const ReviewRequests: React.FC<Props> = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<number | undefined>(0);
  const setToggle = (num: number) => {
    setExpanded((ex) => (num !== ex ? num : undefined));
  };
  return (
    <Paper className={classes.root}>
      <Typography className={classes.heading}>Review Requests</Typography>
      {[1, 2, 3, 4, 5].map((v, i) => (
        <ExpansionPanel
          key={i}
          expanded={expanded === i}
          onChange={() => setToggle(i)}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              Employee Name {v}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <ReviewForm />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </Paper>
  );
};
export default ReviewRequests;
