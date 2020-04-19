import React, { useCallback, useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
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
        <Button
          color="primary"
          autoFocus
          variant="contained"
          onClick={() => props.closePopup(true)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default EmployeeModal;
