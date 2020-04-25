import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  DialogActions,
  Button,
  Theme,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { setReviewers } from "../../API/reviewApi";

interface IEmployee {
  uid: string;
  name?: string;
  email?: string;
  password?: string;
}

interface Props {
  visible: boolean;
  uid: string;
  employees: IEmployee[];
  onClose: (result: boolean) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  minWidth: {
    minWidth: "500px",
  },
  margins: {
    marginBottom: "10px",
  },
  wrapper: {
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

const AssignReviewDialog: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [selectedList, setSelectedList] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [isClosing, setIsClosing] = useState(false);

  const toggleCheckbox = (uid: string) => {
    setSelectedList((obj) => ({ ...obj, [uid]: !obj[uid] }));
  };

  const onClose = async (result: boolean) => {
    setIsClosing(true);
    try {
      const reviewers = Object.keys(selectedList)
        .filter((id) => !!selectedList[id])
        .map((from) => ({ from, to: props.uid }));
      await setReviewers(reviewers);
    } catch (error) {}
    setIsClosing(false);
    setSelectedList({});
    props.onClose(result);
  };

  return (
    <Dialog open={props.visible} onClose={() => props.onClose(false)}>
      <DialogTitle id="alert-dialog-title">Assign Reviewers</DialogTitle>
      <DialogContent className={classes.minWidth}>
        {props.employees &&
          props.employees.map(
            (emp) =>
              emp.uid !== props.uid && (
                <ListItem
                  key={emp.uid}
                  button
                  onClick={() => toggleCheckbox(emp.uid)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selectedList[emp.uid] || false}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText primary={emp.name} />
                </ListItem>
              )
          )}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => props.onClose(false)}>
          Cancel
        </Button>
        <div className={classes.wrapper}>
          <Button
            color="primary"
            autoFocus
            variant="contained"
            onClick={() => onClose(true)}
            disabled={isClosing}
          >
            Save
          </Button>
          {isClosing && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default AssignReviewDialog;
