const getFilteredTasks = (tasks, status = null) => {
  const initialAcc = { active: [], finished: [], };

  const filteredTasks = tasks.reduce((acc, task) => {
    if (task.status === 'active') {
      acc.active = [...acc.active, task];
    } else {
      acc.finished = [...acc.finished, task];
    };
    return acc;
  }, initialAcc);

  return status ? filteredTasks[status] : filteredTasks;
};
export default getFilteredTasks;
