import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('sqlite:./db/ppc-db.db.sqlite');
