import React, { useState, useContext, useEffect } from "react";
import {
  Paper,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";

const useStyles = makeStyles({
  container: {
    margin: "10px",
    padding: "10px",
  },
});

const EmployeeList: React.FC = () => {
  const classes = useStyles();
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    const u = [];
    for (let i = 0; i < 10; i++) {
      u.push({
        id: Math.random(),
        name: Math.random().toString(36).substr(2),
      });
    }
    setUsers(u);
  }, []);

  const deleteUser = (id: string) => {
    console.log(`Delete User ${id}`);
  };
  const editUser = (id: string) => {
    console.log(`edit User ${id}`);
  };

  const showUser = (id: string) => {
    console.log(`Show User ${id}`);
  };
  return (
    <Paper className={classes.container} elevation={3}>
      <List component="nav" aria-label="Active users">
        {users &&
          users.map(({ id, name }) => (
            <ListItem key={id} button onClick={() => showUser(id)}>
              <ListItemText primary={name} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="Edit"
                  onClick={() => editUser(id)}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="Delete"
                  onClick={() => deleteUser(id)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    </Paper>
  );
};
export default EmployeeList;
