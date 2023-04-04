import Categories from "./Components/Categories";
import Tasks from "./Components/Tasks";

const TodoPage = () => {
  console.log('e');

  return (
    <div className="container h-100 my-4 overflow-hidden rounded text-white">
      <div className="row h-100 flex-md-row">
        <Categories />
        <Tasks />
      </div>
    </div>
  );
};

export default TodoPage;
