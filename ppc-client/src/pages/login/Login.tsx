import React, { useState } from "react";

import {
  Paper,
  makeStyles,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Theme,
  IconButton,
  Button,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { RouteComponentProps } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  loginCard: {
    position: "fixed",
    top: "50%",
    left: "50%",
    width: "calc(100% - 50px)",
    maxWidth: "500px",
    transform: "translate(-50%, -50%)",
    padding: "20px",
  },
  loginContainer: {
    
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

interface State {
  email: string;
  password: string;
  showPassword: boolean;
}
interface Props extends RouteComponentProps {}
const Login: React.FC<Props> = (props) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    showPassword: false,
    password: "",
    email: "",
  });

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const login = () => {
    props.history.push({
      pathname: "/",
    });
  };

  return (
    <div className={classes.loginContainer}>
      <Paper elevation={3} className={classes.loginCard}>
        <FormControl fullWidth className={classes.margin} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-email"
            value={values.email}
            onChange={handleChange("email")}
            labelWidth={60}
          />
        </FormControl>
        <FormControl className={classes.margin} variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={() => login()}
        >
          Login
        </Button>
      </Paper>
    </div>
  );
};

export default Login;
