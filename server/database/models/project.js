const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
mongoose.promise = Promise;

// Define userSchema
const projectSchema = new Schema({
  ownerID: { type: String, unique: false, required: true },
  projectName: { type: String, unique: false, required: true },
  projectDescription: { type: String, unique: false, required: true },
  projectSkillReq: { type: String, unique: false, required: false },
  projectDue: { type: String, unique: false, required: false },
  projectInit: Date
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
