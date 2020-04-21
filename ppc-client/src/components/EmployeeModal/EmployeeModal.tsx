import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  TextField,
  makeStyles,
  CircularProgress,
  Theme,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme: Theme) => ({
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
interface Employee {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
}
interface Props {
  open: boolean;
  data?: Employee;
  isClosing?: boolean;
  closePopup: (result: boolean) => void;
}
const EmployeeModal: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [newEmployee, setNewEmployee] = useState<Employee>();
  useEffect(() => {
    setNewEmployee(props.data);
  }, [props]);

  const onTextChange = (field: string, value: string) => {
    setNewEmployee((emp) => ({
      ...emp,
      [field]: value,
    }));
  };

  return (
    <Dialog open={props.open} onClose={() => props.closePopup(false)}>
      <DialogTitle id="alert-dialog-title">
        {props.data ? `Modify Information for` : "Create New Employee"}
      </DialogTitle>
      <DialogContent>
        {props.data && (
          <TextField
            className={classes.margins}
            id="employee-id"
            label="Employee ID"
            variant="outlined"
            fullWidth
            value={newEmployee?.id || ""}
            InputProps={{
              readOnly: true,
            }}
          />
        )}
        <TextField
          id="employee-name"
          label="Employee Name"
          variant="outlined"
          fullWidth
          className={classes.margins}
          value={newEmployee?.name || ""}
          onChange={(evt) => onTextChange("name", evt.target.value)}
        />
        <TextField
          id="employee-email"
          label="Employee Email"
          variant="outlined"
          fullWidth
          className={classes.margins}
          value={newEmployee?.email || ""}
          onChange={(evt) => onTextChange("email", evt.target.value)}
        />
        <TextField
          id="employee-password"
          label="Employee Password"
          variant="outlined"
          fullWidth
          className={classes.margins}
          value={newEmployee?.password || ""}
          onChange={(evt) => onTextChange("password", evt.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => props.closePopup(false)}>
          Cancel
        </Button>
        <div className={classes.wrapper}>
          <Button
            color="primary"
            autoFocus
            variant="contained"
            onClick={() => props.closePopup(true)}
            disabled={props.isClosing}
          >
            Save
          </Button>
          {props.isClosing && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </DialogActions>
    </Dialog>
  );
};
export default EmployeeModal;
