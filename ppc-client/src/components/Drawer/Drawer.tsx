import React, { useCallback, useContext } from "react";
import {
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
} from "@material-ui/core";
import { Message, Group, ExitToApp, Home } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { logoutUser } from "../../API/auth";
import { UserContext } from "../../utils/Contexts";
const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

interface Props {
  openDrawer: boolean;
  toggleDrawer: (drawerState: boolean) => void;
}
const MenuDrawer: React.FC<Props> = (props) => {
  const { user, setUser } = useContext(UserContext);
  const classes = useStyles();

  const logout = async () => {
    await logoutUser();
    setUser({});
    window.location.href = "/login";
  };

  return (
    <Drawer
      anchor="left"
      open={props.openDrawer}
      onClose={() => props.toggleDrawer(false)}
      className={classes.list}
    >
      <div className={classes.list} onClick={() => props.toggleDrawer(false)}>
        <List>
          <ListItem button component={Link} to="/">
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItem>
          <ListItem button component={Link} to="/review-requests">
            <ListItemIcon>
              <Message />
            </ListItemIcon>
            <ListItemText primary={"Review Requests"} />
          </ListItem>
          {user?.isAdmin && (
            <ListItem button component={Link} to="/employees">
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary={"employees"} />
            </ListItem>
          )}
        </List>
        <Divider />
        <List>
          <ListItem button onClick={() => logout()}>
            <ListItemIcon>
              <ExitToApp />
            </ListItemIcon>
            <ListItemText primary={"Logout"} />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};
export default MenuDrawer;
