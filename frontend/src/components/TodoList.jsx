import React from "react";
/* import { useDispatch, useSelector } from "react-redux";
import {addTask, deleteTask} from "../store";*/
import { useState } from "react"; 
// import { configureStore } from "@reduxjs/toolkit";

import { useSelector, useDispatch } from "react-redux";
// import { addTask, deleteTask } from "../app/store";
import { addTask, deleteTask } from "../features/tasks/tasksSlice";


export const TodoList = () => {
  const [userTask, setUserTask] = useState("");
  
  const tasks = useSelector((state) =>state.taskReducer.task);
  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(userTask));
    setUserTask("");
  }

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  }

  return (
    <div className="">
      <div className="todo-app">
        <h1>To-do List:</h1>

        <div className="row">
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              id="input-box" 
              value={userTask}
              placeholder="Add a new task"
              onChange={(e)=>setUserTask(e.target.value)}
            />
            <button type="submit">Add Task</button>
          </form>
        </div>

        {/* <button onClick={handleFetchTasks}>Fetch Tasks</button> */}

        <ul id="list-container">
          {tasks?.map((curTask, index) => {
            return (<li key={index}>
              <p>
                {index}: {curTask}
                <button onClick={()=>handleDelete(index)}>Delete</button>
              </p> 
              
            </li>);
          })}
        </ul>
      </div>
    </div>
  );

}



