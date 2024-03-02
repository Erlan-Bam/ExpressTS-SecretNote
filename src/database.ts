import { db_host, db_port, db_name, db_user, db_password } from './config';
import { Sequelize } from "sequelize-typescript";
import { Note } from './models/noteModel';
const sequelize = new Sequelize({
  dialect: "postgres",
  host: db_host,
  port: db_port,
  database: db_name,
  username: db_user,
  password: db_password,
  models: [Note],
});

export default sequelize

sequelize.sync({ force: false })
.then(() => {
    console.log("Database synchronized");
})
.catch((error) => {
    console.error("Failed to synchronize database:", error);
});