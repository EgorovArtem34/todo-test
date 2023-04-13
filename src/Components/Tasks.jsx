// import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import { showModal } from '../slices/modalsSlice';
import { removeFinishedTasks } from '../slices/tasksSlice';
import { useState } from 'react';
import { TaskContext } from '../contexts';
import { useTask } from '../hooks';

const TaskList = () => {
  const dispatch = useDispatch();
  const auth = useTask();
  const { tasks } = auth;
  const handleLiClick = (e) => {
    const { id } = e.currentTarget;
    dispatch(showModal({ type: 'updateTask', id }));
  };
  const handleCircleClick = (e) => {
    e.stopPropagation();
    const { id } = e.currentTarget;
    dispatch(showModal({ type: 'finishedTask', id }));
  };
  return (
    <ul className="mb-3 px-3">
      {tasks.map((task) => {
        const pathClass = cn({
          'second-path': task.status === 'active',
        });

        return (
          <li className="d-flex flex-column pb-2 border-bottom mt-1" key={task.id} id={task.id} onClick={handleLiClick}>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" id={task.id} width="16" height="16" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16" onClick={handleCircleClick}>
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path className={pathClass} d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
              </svg>
              <span className="fw-bold ps-2">{task.name}</span>
            </div>
            <span className="ps-4">{task.description}</span>
          </li>
        )
      })}
    </ul>
  )
};

const Task = () => {
  const dispatch = useDispatch();
  const [currentStatusTasks, setCurrentStatusTasks] = useState('all');
  const tasks = useSelector(({ tasksSlice }) => tasksSlice.tasks);
  const filteredTasks = currentStatusTasks === 'all' ? tasks : tasks.filter((task) => task.status === currentStatusTasks);
  const countFilteredTasks = filteredTasks.length;

  const handleClick = () => {
    dispatch(showModal({ type: 'addNewTask', id: null, }));
  }

  return (
    <div className="col-12 col-md-10 col-sm-9 col-xs-12 h-100">
      <div className="d-flex flex-column h-100">
        <div className="d-flex justify-content-between text-blue bg-categories p-2 
      rounded border-blue align-items-center">
          <span className="d-none d-sm-block">{countFilteredTasks} задач</span>
          <button className="btn-add px-3 py-1" type="submit" onClick={handleClick}>
            Добавить новую задачу
          </button>
          <button variant="link" className="text-decoration-none text-blue border-0 bg-transparent" onClick={() => dispatch(removeFinishedTasks())}>Очистить завершенные</button>
        </div>
        <div className="d-flex flex-column bg-categories mt-2 vh-100 border-blue overflow-auto">
          <div className="p-2 overflow-auto mt-2">
            <TaskContext.Provider value={{ tasks: filteredTasks }}>
              <TaskList />
            </TaskContext.Provider>
          </div>
          <div className="mt-auto d-flex justify-content-center py-3">
            <button variant="link" className="text-decoration-none text-blue border-0 bg-transparent" onClick={() => setCurrentStatusTasks('active')}>Активные</button>
            <button variant="link" className="text-decoration-none text-blue border-0 bg-transparent" onClick={() => setCurrentStatusTasks('all')}>Все</button>
            <button variant="link" className="text-decoration-none text-blue border-0 bg-transparent" onClick={() => setCurrentStatusTasks('finished')}>Завершенные</button>
          </div>
        </div>
      </div>
    </div >
  )
};
export default Task;
