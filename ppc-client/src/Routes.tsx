import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import EmployeeList from "./pages/Employees/List/EmployeeList";
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
import EmployeeInfo from "./pages/Employees/Info/EmployeeInfo";
import ReviewRequests from "./pages/reviewRequests/ReviewRequests";
import { UserContext, IUser } from "./utils/Contexts";

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
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const val = localStorage.getItem("user");
    setUser(val ? JSON.parse(val) : null);
  }, []);

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <AppBar position="static">
          <Toolbar>
            {user && (
              <>
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
              </>
            )}
            <Typography variant="h6" className={classes.title}>
              Welcome
            </Typography>
            <Button color="inherit">日本語</Button>
          </Toolbar>
        </AppBar>
        <Switch>
          <Route
            path="/review-requests"
            component={ReviewRequests}
            exact
          ></Route>
          <Route path="/employees" component={EmployeeList} exact />
          <Route path="/employees/:id" component={EmployeeInfo} exact></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/"></Route>
        </Switch>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
