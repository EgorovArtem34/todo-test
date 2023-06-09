import AddNewTask from './AddNewTask.jsx';
import UpdateTask from './UpdateTask.jsx';
import FinishedTask from './FinishedTask.jsx';

const modals = {
  addNewTask: AddNewTask,
  updateTask: UpdateTask,
  finishedTask: FinishedTask,
};
export default (type) => modals[type];
