/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const getLocalStorageTasks = () => localStorage.getItem('tasks');

const updateLocalStorageTasks = (tasks) => {
  localStorage.setItem('tasks', tasks);
};

const getInitialTasks = () => {
  const localStorageTasks = getLocalStorageTasks();
  if (localStorageTasks) {
    return JSON.parse(localStorageTasks);
  }
  const emptyTaskList = [];
  localStorage.setItem('tasks', JSON.stringify(emptyTaskList));
  return emptyTaskList;
};

const initialState = {
  tasks: getInitialTasks(),
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, { payload }) => {
      state.messages.push(payload);
      updateLocalStorageTasks(state.messages);
    },
  },
});

export const { addTask } = tasksSlice.actions;

export default tasksSlice.reducer;
