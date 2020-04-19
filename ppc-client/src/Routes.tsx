import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import EmployeeList from "./pages/employees/list/EmployeeList";
import {
  AppBar,
  Toolbar,
  IconButton,
  makeStyles,
  Typography,
  Button,
  Theme,
} from "@material-ui/core";
import MenuDrawer from "./components/Drawer/Drawer";
import { Menu } from "@material-ui/icons";
import EmployeeInfo from "./pages/employees/info/EmployeeInfo";
import { LoaderContext } from "./utils/Contexts";
import Loader from "./components/Loader/Loader";
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const [drawerState, setDrawerState] = useState(false);
  const isLoading = useContext(LoaderContext);

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
          <Route path="/employees/:id" component={EmployeeInfo} exact></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/"></Route>
        </Switch>
      </Router>
      {isLoading > 0 && <Loader />}
    </>
  );
}

export default App;
