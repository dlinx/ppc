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
  FormHelperText,
} from "@material-ui/core";
import { Visibility, VisibilityOff, Label } from "@material-ui/icons";
import { RouteComponentProps } from "react-router-dom";
import AsyncButton from "../../components/AsyncButton/AsyncButton";
import { loginUser } from "../../API/loginUser";

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
  loginContainer: {},
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
  const [isLoading, setIsLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const login = async () => {
    setIsLoading(true);
    try {
      await loginUser(values.email, values.password);
      props.history.push({
        pathname: "/",
      });
    } catch (e) {
      setErrMessage(
        e?.response?.data?.message || e?.message || "Something went wrong"
      );
    }
    setIsLoading(false);
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
            required={true}
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
        <div>
          <FormHelperText error={true}>{errMessage}</FormHelperText>
        </div>
        <AsyncButton
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          onClick={() => login()}
          isLoading={isLoading}
        >
          Login
        </AsyncButton>
      </Paper>
    </div>
  );
};

export default Login;
