const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.promise = Promise;

// Define projectSchema
const projectSchema = new Schema({
  ownerID: { type: String, unique: false, required: false },
  projectName: { type: String, unique: false, required: false },
  projectDescription: { type: String, unique: false, required: false },
  projectSkillReq: { type: Array, unique: false, required: false },
  projectBudget: { type: Number, unique: false, required: false },
  projectDue: { type: Date, unique: false, required: false },
  projectInit: { type: Date, default: Date.now, required: false }
  // assign, assignee, completed
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
