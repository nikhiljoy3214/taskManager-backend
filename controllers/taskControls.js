import Task from "../models/Task.js";

// ADD TASK

export const createTask = async (req, res) => {
    try {
      const { title, description, status, userId } = req.body;
  
      const newTask = new Task({
        title,
        description,
        status,
        user: userId,
      });
  
      const savedTask = await newTask.save();
      res.status(201).json(savedTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

//   EDIT TASK
  
  export const editTask = async (req, res) => {
    try {
      const { taskId } = req.params;
      const { title, description, status } = req.body;
  
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { title, description, status, updatedAt: Date.now() },
        { new: true }
      );
  
      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }
  
      res.status(200).json(updatedTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  //GET TASK BY USER
  
  export const getTasksByUser = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const tasksByUser = await Task.find({ user: userId });
  
      res.status(200).json(tasksByUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

    //GET TASK BY ID
  
  export const getTaskById = async (req, res) => {
    try {
      const { taskId } = req.params;
  
      const task = await Task.findById(taskId);
  
      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }
  
      res.status(200).json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };


  // Delete task by ID
export const deleteTask = async (req, res) => {
  try {
    const {taskId} = req.params;

    // Check if the task exists
    const existingTask = await Task.findById(taskId);
    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Check if the logged-in user has permission to delete the task (optional)
    // For example, you might want to check if the task belongs to the logged-in user

    // Delete the task
    await Task.findByIdAndDelete(taskId);

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};