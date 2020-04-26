import React, { useState } from "react";
import {
  SentimentVeryDissatisfied,
  SentimentDissatisfied,
  SentimentSatisfied,
  SentimentSatisfiedAlt,
  SentimentVerySatisfied,
} from "@material-ui/icons";
import Rating, { IconContainerProps } from "@material-ui/lab/Rating";
import {
  Box,
  Typography,
  TextField,
  Button,
  makeStyles,
  Theme,
  CircularProgress,
} from "@material-ui/core";

import { submitReview } from "../../API/reviewApi";
import { green } from "@material-ui/core/colors";

const customIcons: {
  [index: string]: { icon: React.ReactElement; label: string };
} = {
  1: {
    icon: <SentimentVeryDissatisfied />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfied />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfied />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAlt />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfied />,
    label: "Very Satisfied",
  },
};
function IconContainer(props: IconContainerProps) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value]?.icon}</span>;
}

interface Props {
  name: string;
  value?: number;
  onChange?: (event: React.ChangeEvent<{}>, value: number | null) => void;
  readonly?: boolean;
}

const ReviewRating: React.FC<Props> = (props) => {
  return (
    <Box component="fieldset" mb={3} borderColor="transparent">
      <Typography component="legend">{props.children}</Typography>
      <Rating
        name={props.name}
        value={props.value}
        getLabelText={(value: number) => customIcons[value]?.label}
        IconContainerComponent={IconContainer}
        onChange={props.onChange}
        readOnly={props.readonly}
      />
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
  },
  margins: {
    marginBottom: "10px",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
    display: "flex",
    justifyContent: "flex-end",
  },

  btnWrapper: {
    margin: theme.spacing(1),
    position: "relative",
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

interface IReview {
  rid?: string;
  responsibility?: number;
  learningAbility?: number;
  creativity?: number;
  punctuality?: number;
  communication?: number;
  comments?: string;
  from?: string;
  to?: string;
  ReviewTo?: {
    name?: string;
  };
}

interface IReviewFormProps {
  review?: IReview;
  isLoading?: boolean;
  onChange?: (review: IReview) => void;
  onSave?: (review: IReview) => void;
  readonly?: boolean;
}

const ReviewForm: React.FC<IReviewFormProps> = (props) => {
  const classes = useStyles();
  const [isClosing, setIsClosing] = useState(false);
  const review = props.review || {};

  const onChange = (field: string, value: string | number | null) => {
    if (props.readonly) return;
    if (props.onChange) props.onChange({ ...review, [field]: value });
  };

  const onSave = async () => {
    setIsClosing(true);
    const res = await submitReview(review?.rid || "", review);
    setIsClosing(false);
    if (props.onSave) props.onSave(review);
  };

  const onCancel = () => {
    if (props.onChange)
      props.onChange({
        responsibility: 0,
        learningAbility: 0,
        creativity: 0,
        punctuality: 0,
        communication: 0,
        comments: "",
      });
  };

  return (
    <Box className={classes.root}>
      <ReviewRating
        name={`${review.rid}_"Responsibility"`}
        value={review.responsibility}
        onChange={(e, val) => onChange("responsibility", val)}
        readonly={props.readonly}
      >
        Responsibility
      </ReviewRating>
      <ReviewRating
        name={`${review.rid}_"Learning_Ability"`}
        value={review.learningAbility}
        onChange={(e, val) => onChange("learningAbility", val)}
        readonly={props.readonly}
      >
        Learning Ability
      </ReviewRating>
      <ReviewRating
        name={`${review.rid}_"Creativity"`}
        value={review.creativity}
        onChange={(e, val) => onChange("creativity", val)}
        readonly={props.readonly}
      >
        Creativity
      </ReviewRating>
      <ReviewRating
        name={`${review.rid}_"Punctuality"`}
        value={review.punctuality}
        onChange={(e, val) => onChange("punctuality", val)}
        readonly={props.readonly}
      >
        Punctuality
      </ReviewRating>
      <ReviewRating
        name={`${review.rid}_"Communication"`}
        value={review.communication}
        onChange={(e, val) => onChange("communication", val)}
        readonly={props.readonly}
      >
        Communication
      </ReviewRating>
      <TextField
        label="Additional Comments"
        multiline
        rows={4}
        value={review.comments}
        variant="outlined"
        onChange={(e) => onChange("comments", e.target.value)}
        fullWidth
        InputProps={{
          readOnly: props.readonly,
        }}
      />
      {!props.readonly && (
        <Box className={classes.wrapper}>
          <Button variant="text" color="primary" onClick={() => onCancel()}>
            Cancel
          </Button>

          <div className={classes.btnWrapper}>
            <Button
              color="primary"
              autoFocus
              variant="contained"
              onClick={onSave}
              disabled={isClosing}
            >
              Submit Review
            </Button>
            {isClosing && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
        </Box>
      )}
    </Box>
  );
};

export default ReviewForm;
