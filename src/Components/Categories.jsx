import { useSelector } from "react-redux";
import getFilteredTasks from "../utils/getFilteredTasks";

const Categories = () => {
  const tasks = useSelector(({ tasksSlice }) => tasksSlice.tasks);
  const { active, finished } = getFilteredTasks(tasks);
  return (
    <div className="d-none d-sm-flex col-3 col-md-2 col-sm-3 col-xs-1 px-0 bg-categories flex-column h-100 d-flex align-items-center rounded border-blue">
      <div className="d-flex pt-3 mb-2">
        <div className="px-3">Количество задач</div>
      </div>
      <div className="p-4">
        <ul className="list-unstyled">
          <li className="pb-2">Все: {tasks.length} шт.</li>
          <li className="pb-2">Активные: {active.length} шт.</li>
          <li className="pb-2">Завершенные: {finished.length} шт.</li>
        </ul>
      </div>
    </div>
  )
};
export default Categories;
