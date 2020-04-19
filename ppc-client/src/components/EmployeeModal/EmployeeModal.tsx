import React, { useCallback, useState, useEffect } from "react";
import {
  Modal,
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  DialogContentText,
  Button,
  DialogActions,
  TextField,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles({
  margins: {
    marginBottom: "10px",
  },
});
interface Employee {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
}
interface Props {
  open: boolean;
  data?: Employee;
  closePopup: () => void;
}
const EmployeeModal: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [newEmployee, setNewEmployee] = useState<Employee>();
  useEffect(() => {
    setNewEmployee(props.data);
  }, [props]);

  const cancel = useCallback(() => {
    props.closePopup();
  }, []);
  const save = useCallback(() => {
    props.closePopup();
  }, []);

  const onTextChange = (field: string, value: string) => {
    setNewEmployee((emp) => ({
      ...emp,
      [field]: value,
    }));
  };

  return (
    <Dialog open={props.open} onClose={() => props.closePopup()}>
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
        <Button color="primary" onClick={() => cancel()}>
          Cancel
        </Button>
        <Button
          color="primary"
          autoFocus
          variant="contained"
          onClick={() => save()}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default EmployeeModal;
