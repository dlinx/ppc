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
} from "@material-ui/core";
import { Delete, Edit, PersonAdd } from "@material-ui/icons";
import { RouteComponentProps } from "react-router-dom";
import EmployeeModal from "../../../components/EmployeeModal/EmployeeModal";

const useStyles = makeStyles({
  container: {
    margin: "10px",
    padding: "10px",
  },
  btnCreateEmp: {
    bottom: "20px",
    right: "20px",
    position: "absolute",
  },
});

interface Props extends RouteComponentProps {}
interface Employee {
  id: string;
  name: string;
  email: string;
  password?: string;
}

const EmployeeList: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [users, setUsers] = useState<Employee[]>([]);

  const [empPopup, setEmpPopup] = useState<{
    isOpen: boolean;
    data?: Employee;
  }>({ isOpen: false });

  useEffect(() => {
    const u = [];
    for (let i = 0; i < 10; i++) {
      u.push({
        id: Math.random().toString().substr(2),
        name: Math.random().toString(36).substr(2),
        email: `${Math.random()
          .toString(36)
          .substr(2)}@${Math.random().toString(36).substr(2)}.com`,
      });
    }
    setUsers(u);
  }, []);

  const deleteUser = (id: string) => {
    console.log(`Delete User ${id}`);
  };
  const editEmployee = (emp: Employee) => {
    setEmpPopup({ data: emp, isOpen: true });
  };

  const showUser = (id: string) => {
    props.history.push({
      pathname: `/employees/${id}`,
    });
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
              <ListItem key={emp.id} button onClick={() => showUser(emp.id)}>
                <ListItemText primary={emp.name} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="Edit"
                    onClick={() => editEmployee(emp)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="Delete"
                    onClick={() => deleteUser(emp.id)}
                  >
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
        </List>
      </Paper>
      <Fab
        color="primary"
        className={classes.btnCreateEmp}
        onClick={() => setEmpPopup({ isOpen: true, data: undefined })}
      >
        <PersonAdd />
      </Fab>
      <EmployeeModal
        open={empPopup.isOpen}
        data={empPopup.data}
        closePopup={() => setEmpPopup({ isOpen: false })}
      />
    </>
  );
};
export default EmployeeList;
