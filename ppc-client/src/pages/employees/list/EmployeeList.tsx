import React, { useState, useEffect } from "react";
import {
  Paper,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  ListSubheader,
  Fab,
  Tooltip,
  ListItemIcon,
  Checkbox,
  Box,
  Theme,
} from "@material-ui/core";
import { Delete, Edit, PersonAdd, RateReview } from "@material-ui/icons";
import { RouteComponentProps } from "react-router-dom";
import EmployeeModal from "../../../components/EmployeeModal/EmployeeModal";
import ConfirmDialog from "../../../components/ConfirmDialog/ConfirmDialog";
import InfoDialog from "../../../components/InfoDialog/InfoDialog";
import { GetEmployeeList } from "../../../API/employeeApi";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    margin: "10px",
    padding: "10px",
  },
  btnCreateEmp: {
    bottom: "20px",
    right: "20px",
    position: "absolute",
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

interface Props extends RouteComponentProps {}
interface Employee {
  uid: string;
  name: string;
  email: string;
  password?: string;
}

const EmployeeList: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [users, setUsers] = useState<Employee[]>([]);
  const [confirmStatus, setConfirmStatus] = useState(false);
  const [info, setInfo] = useState({ visible: false, message: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [empPopup, setEmpPopup] = useState<{
    isOpen: boolean;
    data?: Employee;
  }>({ isOpen: false });
  const [selectedList, setSelectedList] = useState<{ [key: string]: boolean }>(
    {}
  );

  const getEmployeeList = async () => {
    try {
      const { data } = await GetEmployeeList();
      setUsers(data);
    } catch (e) {
      console.dir(e);
    }
  };

  useEffect(() => {
    getEmployeeList();
  }, []);

  const deleteUser = (id: string) => {
    setConfirmStatus(true);
  };

  const onDeleteConfirmation = (result: boolean) => {
    setConfirmStatus(false);
    if (result) setInfo({ message: "Employee Deleted", visible: true });
  };

  const editEmployee = (emp: Employee) => {
    setEmpPopup({ data: emp, isOpen: true });
  };

  const onEmployeeUpdate = (result: boolean) => {
    if (result) {
      setIsSaving(true);
      setTimeout(() => {
        const { data } = empPopup;
        const message = data
          ? `Employee Information updated.`
          : `New employee record created.`;
        setInfo({ message: message, visible: true });
        setEmpPopup({ isOpen: false });
        setIsSaving(false);
      }, 1000);
    } else {
      setEmpPopup({ isOpen: false });
    }
  };

  const showUser = (id: string) => {
    props.history.push({
      pathname: `/employees/${id}`,
    });
  };

  const toggleCheckbox = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    setSelectedList((o) => ({ ...o, [id]: !o[id] }));
    e.stopPropagation();
  };

  const isSelectedAny = Object.values(selectedList).reduce(
    (prev, cur) => prev || cur,
    false
  );

  const deleteSelected = () => {
    setConfirmStatus(true);
    const ids = Object.keys(selectedList).filter((id) => selectedList[id]);
    console.log("selected for delete", ids);
  };

  return (
    <>
      <Paper className={classes.container} elevation={3}>
        <List
          component="nav"
          aria-label="active-employees"
          subheader={
            <ListSubheader component="div" id="active-employees">
              Active Employees
            </ListSubheader>
          }
        >
          {users &&
            users.map((emp) => (
              <ListItem key={emp.uid} button onClick={() => showUser(emp.uid)}>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={selectedList[emp.uid] || false}
                    tabIndex={-1}
                    disableRipple
                    onClick={(e) => toggleCheckbox(e, emp.uid)}
                  />
                </ListItemIcon>
                <ListItemText primary={emp.name} />
                <ListItemSecondaryAction>
                  <Tooltip title="Assign Reviewers">
                    <IconButton
                      edge="end"
                      aria-label="Delete"
                      onClick={() => deleteUser(emp.uid)}
                    >
                      <RateReview />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit">
                    <IconButton
                      edge="end"
                      aria-label="Edit"
                      onClick={() => editEmployee(emp)}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      edge="end"
                      aria-label="Delete"
                      onClick={() => deleteUser(emp.uid)}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
      </Paper>
      <Box className={classes.btnCreateEmp}>
        {isSelectedAny && (
          <Tooltip title="Delete selected employees">
            <Fab
              className={classes.margin}
              color="primary"
              onClick={() => deleteSelected()}
            >
              <Delete />
            </Fab>
          </Tooltip>
        )}
        <Tooltip title="Add new employee">
          <Fab
            color="primary"
            className={classes.margin}
            onClick={() => setEmpPopup({ isOpen: true, data: undefined })}
          >
            <PersonAdd />
          </Fab>
        </Tooltip>
      </Box>
      <EmployeeModal
        open={empPopup.isOpen}
        data={empPopup.data}
        closePopup={(result) => onEmployeeUpdate(result)}
        isClosing={isSaving}
      />
      <ConfirmDialog
        dialogStatus={confirmStatus}
        onClose={onDeleteConfirmation}
        message={`Do you want to delete selected employee/s? After confirmation, you can not reverse this process.`}
      />
      <InfoDialog
        dialogStatus={info.visible}
        message={info.message}
        onClose={() => setInfo({ visible: false, message: "" })}
      />
    </>
  );
};
export default EmployeeList;
