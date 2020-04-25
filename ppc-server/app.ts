import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import session from "express-session";
import passport from "passport";
import cors from 'cors';

import indexRouter from "./app/routes/index";
import usersRouter from "./app/routes/employees";
import authRouter from "./app/routes/auth";
import reviewsRouter from "./app/routes/reviews";
import meRouter from "./app/routes/me";
import { adminAccess } from "./app/utils/authorization";

var sess = {
  secret: "keyboard cat",
  cookie: {},
};

const app = express();

app.use(cors())
app.use(session(sess));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
import "./app/utils/passportConfig";

app.use("/auth", authRouter);
app.use("/", passport.authenticate("jwt", { session: false }), indexRouter);
app.use(
  "/employees",
  passport.authenticate("jwt", { session: false }),
  adminAccess,
  usersRouter
);

app.use('/review', passport.authenticate("jwt", { session: false }), adminAccess, reviewsRouter);

app.use('/me', passport.authenticate("jwt", { session: false }), meRouter);

export default app;
