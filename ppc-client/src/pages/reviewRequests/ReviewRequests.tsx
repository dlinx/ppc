import React, { useState, useEffect } from "react";
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
import { getMyReviewRequests } from "../../API/reviewApi";

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
  ReviewTo?: {
    name?: string;
  };
}

interface Props {}
const ReviewRequests: React.FC<Props> = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState<number | undefined>(0);
  const [myReviewRequests, setMyReviewRequests] = useState<IReview[]>([]);
  const setToggle = (num: number) => {
    setExpanded((ex) => (num !== ex ? num : undefined));
  };

  const loadReviewRequests = async () => {
    try {
      const { data } = await getMyReviewRequests();
      setMyReviewRequests(data);
    } catch (error) {
      console.dir(error);
    }
  };

  useEffect(() => {
    loadReviewRequests();
  }, []);

  const onChangeReview = (index: number, review: IReview) => {
    setMyReviewRequests((r) => {
      const revCopy: IReview[] = JSON.parse(JSON.stringify(r));
      revCopy[index] = review;
      return revCopy;
    });
  };

  return (
    <Paper className={classes.root}>
      <Typography className={classes.heading}>Review Requests</Typography>
      {myReviewRequests.map((rev, i) => (
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
              {rev?.ReviewTo?.name}
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

export default ReviewRequests;
