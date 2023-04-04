
const Task = () => {
  console.log(' ');
  return (
    <div className="col-12 col-md-10 col-sm-9 col-xs-12 h-100">
      <div className="d-flex flex-column h-100">
        <div className="d-flex justify-content-between text-blue bg-categories p-2 
      rounded border-blue align-items-center">
          <span className="d-none d-sm-block">17 задач</span>
          <button className="btn-add px-3 py-1" type="submit">
            Добавить новую задачу
          </button>
          <button variant="link" className="text-decoration-none text-blue border-0 bg-transparent">Очистить завершенные</button>
        </div>
        <div className="d-flex flex-column bg-categories mt-2 vh-100 border-blue">
          <div className="overflow-auto px-5">
            тут будут задачи
          </div>
          <div className="mt-auto d-flex justify-content-center py-3">
            <button variant="link" className="text-decoration-none text-blue border-0 bg-transparent">Активные</button>
            <button variant="link" className="text-decoration-none text-blue border-0 bg-transparent">Все</button>
            <button variant="link" className="text-decoration-none text-blue border-0 bg-transparent">Завершенные</button>
          </div>
        </div>
      </div>
    </div>
  )
};
export default Task;
