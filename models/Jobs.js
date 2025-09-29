import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Job = sequelize.define("Job", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  company: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  type: { 
    type: DataTypes.ENUM("internship", "full-time", "part-time", "contract"),
    allowNull: false 
  },
  applicationDeadline: { type: DataTypes.DATE, allowNull: false }
}, {
  timestamps: true
});

export default Job;
