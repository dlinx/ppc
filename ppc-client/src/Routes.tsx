import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import EmployeeList from "./pages/employees/list/EmployeeList";
import {
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  createStyles,
  Typography,
  Button,
  Theme,
} from "@material-ui/core";
import MenuDrawer from "./components/Drawer/Drawer";
import { Menu } from "@material-ui/icons";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

function App() {
  const classes = useStyles();
  const [drawerState, setDrawerState] = useState(false);

  return (
    <>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerState(true)}
            >
              <Menu />
            </IconButton>
            <MenuDrawer
              openDrawer={drawerState}
              toggleDrawer={(dState) => setDrawerState(dState)}
            />
            <Typography variant="h6" className={classes.title}>
              Welcome
            </Typography>
            <Button color="inherit">日本語</Button>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route path="/review-requests" exact></Route>
          <Route path="/employees" component={EmployeeList} exact />
          <Route path="/employees/:id" exact></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/"></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
