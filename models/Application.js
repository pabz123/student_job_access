import { DataTypes } from "sequelize";
import  { sequelize } from  "../config/db.js";
import User from "./User.js";
import Job from "./Job.js";

const Application = sequelize.define("Application", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  status: {
    type: DataTypes.ENUM("applied", "reviewed", "interview", "hired", "rejected"),
    defaultValue: "applied",
  },
});

Application.belongsTo(User, { foreignKey: "studentId", as: "student" });
Application.belongsTo(Job, { foreignKey: "jobId" });

export default Application;
