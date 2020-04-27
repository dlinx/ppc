import React, { useState, useEffect } from "react";
import {
  Paper,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { RouteComponentProps } from "react-router-dom";
import ReviewForm from "../../../components/ReviewRating/ReviewRating";
import { getReviewsFor } from "../../../API/reviewApi";

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

interface IReview {
  rid?: string;
  responsibility?: number;
  learningAbility?: number;
  creativity?: number;
  punctuality?: number;
  communication?: number;
  comments?: string;
  from?: string;
  ReviewFrom?: {
    name?: string;
  };
}

interface Props extends RouteComponentProps<{ uid: string }> {}

const EmployeeInfo: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [expanded, setExpanded] = useState<number | undefined>(0);

  const onChangeReview = (index: number, review: IReview) => {
    setReviews((r) => {
      const revCopy: IReview[] = JSON.parse(JSON.stringify(r));
      revCopy[index] = review;
      return revCopy;
    });
  };

  const setToggle = (num: number) => {
    setExpanded((ex) => (num !== ex ? num : undefined));
  };
  const getAllReviewsFor = async (uid: string) => {
    const { data } = await getReviewsFor(uid);

    setReviews(data);
  };
  useEffect(() => {
    getAllReviewsFor(props.match.params.uid);
  }, [props.match.params.uid]);
  return (
    <Paper className={classes.root}>
      <Typography className={classes.heading}>Reviews Received</Typography>
      {reviews.map((rev, i) => (
        <ExpansionPanel
          key={rev.rid}
          expanded={expanded === i}
          onChange={() => setToggle(i)}
        >
          <ExpansionPanelSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>
              {rev?.ReviewFrom?.name}
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <ReviewForm review={rev} onChange={(r) => onChangeReview(i, r)} />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      ))}
    </Paper>
  );
};
export default EmployeeInfo;
