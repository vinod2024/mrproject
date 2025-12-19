import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../features/tasks/tasksSlice";

// Step 1: Create a simple reducer function.
/* const taskReducer = (state = initialState, action) => {
  switch(action.type){
    case ADD_TASK:
      return {
        ...state,
        task: [...state.task, action.payload],
      };

    case DELETE_TASK:
      const updateTask = state.task.filter(
        (curTask, index) => index !== action.payload
      );
      return {
        ...state,
        task: updateTask,
      };

    default:
      return state;
  }

  
} */

// Store configuration.
export const store = configureStore({
  reducer: {
    taskReducer,
  },
});

// Step 4: dispatch an action to add a task.
// console.log(store.dispatch(addTask("Buy mango")));

