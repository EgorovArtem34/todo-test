import { useContext } from 'react';
import { TaskContext } from '../contexts/index.jsx';

export const useTask = () => useContext(TaskContext);