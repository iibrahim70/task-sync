import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const TaskManager = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [tasks, setTasks] = useState(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return savedTasks;
  });

  const [assign, setAssign] = useState("");

  const onSubmit = (data) => {
    const newTask = { ...data, completed: false, assign };
    setTasks([...tasks, newTask]);
    reset();
    setAssign("");
  };

  const handleTaskComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleTaskDelete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <section className="flex items-center justify-center flex-col lg:flex-row gap-x-10 min-h-screen w-full p-10 text-black">
      <div className="w-full flex-1">
        <h2 className="text-center text-4xl font-bold mb-10">Create Task</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="mb-4">
            <label className="block mb-1 font-medium">Task Title</label>
            <input
              className="inputFields"
              {...register("taskTitle", { required: true })}
            />
            {errors.taskTitle && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Task Description</label>
            <textarea
              className="inputFields"
              {...register("taskDescription", { required: true })}
            />
            {errors.taskDescription && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Due Date</label>
            <input
              className="inputFields"
              type="date"
              {...register("dueDate", { required: true })}
            />
            {errors.dueDate && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Priority Level</label>
            <select
              className="inputFields"
              {...register("priorityLevel", { required: true })}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            {errors.priorityLevel && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Assign</label>
            <input
              className="inputFields"
              {...register("assign", { required: false })}
              value={assign}
              onChange={(e) => setAssign(e.target.value)}
            />
          </div>

          <button type="submit" className="loginButton">
            Create Task
          </button>
        </form>
      </div>

      {/* Task list rendering */}
      <div className="flex-1 mt-[98px]">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="mb-5 flex items-center flex-col shadow-xl p-5 rounded-xl space-y-2"
          >
            <h3 className="text-lg font-semibold">Name: {task.taskTitle}</h3>
            <p>Description: {task.taskDescription}</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Priority: {task.priorityLevel}</p>
            <p>Assign: {task.assign}</p>
            <div className="flex gap-5">
              <button
                onClick={() => handleTaskComplete(index)}
                className={`${
                  task.completed ? "bg-yellow-500" : "bg-green-500"
                } text-white px-2 py-1 rounded`}
              >
                {task.completed ? "In Progress" : "Complete"}
              </button>
              <button
                onClick={() => handleTaskDelete(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TaskManager;
