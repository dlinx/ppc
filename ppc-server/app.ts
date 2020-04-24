import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import session from "express-session";
import passport from "passport";
import { createConnection } from "typeorm";

import indexRouter from "./app/routes/index";
import usersRouter from "./app/routes/users";
import authRouter from "./app/routes/auth";
var sess = {
  secret: "keyboard cat",
  cookie: {},
};

const app = express();

app.use(session(sess));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
import "./app/utils/passportConfig";

export const createDBConnection = () => createConnection({
  type: "mariadb",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "toor",
  database: "ppc_db",
})
  .then(() => {
    console.log('DB Connection created')
  })

app.use("/auth", authRouter);
app.use("/", passport.authenticate("jwt", { session: false }), indexRouter);
app.use(
  "/users",
  passport.authenticate("jwt", { session: false }),
  usersRouter
);

export default app;
