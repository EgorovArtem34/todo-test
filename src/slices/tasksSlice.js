/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const getLocalStorageTasks = () => localStorage.getItem('tasks');

const updateLocalStorageTasks = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
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
      state.tasks.push(payload);
      updateLocalStorageTasks(state.tasks);
    },
    removeFinishedTasks: (state) => {
      state.tasks = state.tasks.filter((task) => task.status !== 'finished');
      updateLocalStorageTasks(state.tasks);
    },
    updateTask: (state, { payload }) => {
      const { id, name, description } = payload;
      state.tasks = state.tasks.map((task) => (task.id === id ? { ...task, name, description }
        : task));
      updateLocalStorageTasks(state.tasks);
    },
    updateTaskStatus: (state, { payload }) => {
      const { status, id } = payload;
      state.tasks = state.tasks.map((task) => (task.id === id ? { ...task, status } : task));
      updateLocalStorageTasks(state.tasks);
    },
  },
});

export const {
  addTask, removeFinishedTasks, updateTask, updateTaskStatus,
} = tasksSlice.actions;

export default tasksSlice.reducer;
