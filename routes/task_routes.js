import express from "express";
import { createTask, deleteTask, editTask, getTaskById, getTasksByUser } from "../controllers/taskControls.js";


const taskRouter = express.Router();


taskRouter.post("/addTask", createTask);
taskRouter.post("/editTask/:taskId", editTask);
taskRouter.get("/getUserTask/:userId", getTasksByUser);
taskRouter.get("/getTaskbyId/:taskId", getTaskById);
taskRouter.delete("/deleteTaskbyId/:taskId", deleteTask);
export default taskRouter;