import { createSlice } from "@reduxjs/toolkit";

// Define action type.
/* const ADD_TASK = "task/add";
const DELETE_TASK = "task/delete"; */

const initialState = {
  task: [],
};

// RTK slice.
const taskReducer = createSlice({
  name: "task",
  initialState: initialState,
  reducers: {
    addTask(state, action) {
      state.task.push(action.payload);
    },
    deleteTask(state, action) {
      state.task = state.task.filter(
        (curTask, index) => index !== action.payload
      );
    },
  },
});

// console.log(taskReducer);
export const { addTask, deleteTask } = taskReducer.actions;
export default taskReducer.reducer;