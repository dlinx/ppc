import React, { useState, useEffect, useContext } from "react";
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
import {
  GetEmployeeList,
  updateEmployee,
  createEmployee,
  deleteEmployees,
} from "../../../API/employeeApi";
import AssignReviewDialog from "../../../components/AssignReviewDialog/AssignReviewDialog";
import { UserContext, InfoDialogContext } from "../../../utils/Contexts";

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

interface INewEmployee {
  name?: string;
  email?: string;
  password?: string;
}

interface IEmployee extends INewEmployee {
  uid: string;
}

const EmployeeList: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [confirmStatus, setConfirmStatus] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [empPopup, setEmpPopup] = useState<{
    isOpen: boolean;
    data?: IEmployee;
  }>({ isOpen: false });
  const [selectedList, setSelectedList] = useState<{ [key: string]: boolean }>(
    {}
  );
  const [deleteCache, setDeleteCache] = useState<string[]>([]);

  const [reviewDialog, setReviewDialog] = useState({
    visibility: false,
    uid: "",
  });

  const { user } = useContext(UserContext);
  const { setInfoMessage } = useContext(InfoDialogContext);

  const loadEmployeeList = async () => {
    try {
      const { data } = await GetEmployeeList();
      setEmployees(data);
    } catch (e) {
      console.dir(e);
    }
  };

  useEffect(() => {
    loadEmployeeList();
  }, []);

  const deleteEmployee = (id: string) => {
    setDeleteCache([id]);
    setConfirmStatus(true);
  };

  const onDeleteConfirmation = async (result: boolean) => {
    setConfirmStatus(false);
    if (!result) {
      setDeleteCache([]);
      return;
    }
    try {
      await deleteEmployees(deleteCache);
      setInfoMessage("Employee Deleted");
    } catch (error) {
      console.dir(error);
      setInfoMessage(error?.message || "Unknown error occured");
    }
    setDeleteCache([]);
    await loadEmployeeList();
  };

  const editEmployee = (emp: IEmployee) => {
    setEmpPopup({ data: emp, isOpen: true });
  };

  const assignReviewer = (uid: string) => {
    setReviewDialog({ visibility: true, uid });
  };

  const onEmployeeUpdate = async (
    result: boolean,
    emp: INewEmployee | undefined
  ) => {
    try {
      if (result) {
        setIsSaving(true);
        const { data } = empPopup;

        if (data) {
          const { name, password, email } = emp || {};
          await updateEmployee(data.uid, { name, email, password });
          setInfoMessage("Employee Information updated.");
        } else {
          const { name, password, email } = emp || {};
          const { data } = await createEmployee<IEmployee>({
            name,
            email,
            password,
          });
          setInfoMessage("New employee record created.");
          setEmployees((emp) => {
            emp.push(data);
            return emp;
          });
        }

        setEmpPopup({ isOpen: false });
        setIsSaving(false);
      } else {
        setEmpPopup({ isOpen: false });
      }
    } catch (error) {
      setInfoMessage(error?.message || "Unknown error");
      setIsSaving(false);
    }
    await loadEmployeeList();
  };

  const showEmployee = (id: string) => {
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
    const ids = Object.keys(selectedList).filter((id) => selectedList[id]);
    if (ids.length > 0) {
      setDeleteCache(ids);
      setConfirmStatus(true);
    }
  };

  const onReviewDialogClose = (result: boolean) => {
    setReviewDialog({ visibility: false, uid: "" });
    if (result) setInfoMessage("Reviewers assigned.");
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
          {employees &&
            employees.map((emp) => (
              <ListItem
                key={emp.uid}
                button
                onClick={() => showEmployee(emp.uid)}
              >
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
                      onClick={() => assignReviewer(emp.uid)}
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
                  {user?.uid !== emp.uid && (
                    <Tooltip title="Delete">
                      <IconButton
                        edge="end"
                        aria-label="Delete"
                        onClick={() => deleteEmployee(emp.uid)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  )}
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
        closePopup={(result, emp) => onEmployeeUpdate(result, emp)}
        isClosing={isSaving}
      />
      <ConfirmDialog
        dialogStatus={confirmStatus}
        onClose={onDeleteConfirmation}
        message={`Do you want to delete selected employee/s? After confirmation, you can not reverse this process.`}
      />

      <AssignReviewDialog
        visible={reviewDialog.visibility}
        onClose={(result) => onReviewDialogClose(result)}
        uid={reviewDialog.uid}
        employees={employees}
      />
    </>
  );
};
export default EmployeeList;
