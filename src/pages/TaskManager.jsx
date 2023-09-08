import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useToast from "../hooks/useToast";

const TaskManager = () => {
  const { showToast } = useToast();
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSorting, setSelectedSorting] = useState("none");

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
    showToast("Task Added successful!");
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
    showToast("Task Deleted successfully!");
    setTasks(updatedTasks);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Filtering function
  const filterTasks = (tasks, status) => {
    if (status === "all") {
      return tasks;
    }
    return tasks.filter((task) => task.completed === (status === "completed"));
  };

  const sortTasks = (tasks, sortingCriteria) => {
    if (sortingCriteria === "none") {
      return tasks;
    }

    return tasks.slice().sort((a, b) => {
      if (sortingCriteria === "priority") {
        // Sort by priority (Low < Medium < High)
        const priorityOrder = { Low: 2, Medium: 1, High: 0 };
        return priorityOrder[a.priorityLevel] - priorityOrder[b.priorityLevel];
      } else if (sortingCriteria === "dueDate") {
        // Sort by due date (earlier dates first)
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else {
        return 0;
      }
    });
  };

  // Apply filtering and sorting to the tasks array
  const filteredTasks = filterTasks(tasks, selectedStatus);
  const sortedTasks = sortTasks(filteredTasks, selectedSorting);

  return (
    <main className="flex items-center justify-center flex-col lg:flex-row gap-x-10 min-h-screen w-full p-10 text-black">
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
      <div className="flex-1 flex items-center justify-center ">
        <div className="w-full">
          <div className="flex justify-end mb-5 gap-2 text-black">
            {/* Filter dropdown */}
            <select
              className="bg-red-200 rounded"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="inProgress">In Progress</option>
              <option value="pending">Pending</option>
            </select>

            {/* Sorting dropdown */}
            <select
              className="bg-red-200 rounded"
              value={selectedSorting}
              onChange={(e) => setSelectedSorting(e.target.value)}
            >
              <option value="none">None</option>
              <option value="priority">Priority</option>
              <option value="dueDate">Due Date</option>
            </select>
          </div>

          {sortedTasks.length <= 0 ? (
            <p className="flex items-center justify-center">No Data Found</p>
          ) : (
            <>
              {" "}
              {sortedTasks.map((task, index) => (
                <div
                  key={index}
                  className="mb-5 flex items-center flex-col shadow-xl p-5 rounded-xl space-y-2"
                >
                  <h3 className="text-lg font-semibold">
                    Name: {task.taskTitle}
                  </h3>
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
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default TaskManager;
