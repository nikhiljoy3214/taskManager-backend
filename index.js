import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRouter from "./routes/user_routes.js";
import taskRouter from "./routes/task_routes.js";



// SERVER

dotenv.config(); 

// const router=require("./Routers/routes")


const server=express()

server.use(cors())
server.use(express.json())

server.use("/user", userRouter);
server.use("/task", taskRouter);

mongoose.connect(process.env.BASE_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("MongoDB Atlas Connected");
}).catch((error)=>{
    console.log("connection Error",error);
})

const port=4000 || port.env.port
server.listen(port,()=>{
    console.log(`______Task_Manager Server started at port ${port}_____`);
})