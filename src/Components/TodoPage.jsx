import Categories from './Categories';
import Tasks from './Tasks';
import Modal from './Modal';

const TodoPage = () => (
  <div className="container h-100 my-4 overflow-hidden rounded text-white">
    <div className="row h-100 flex-md-row">
      <Categories />
      <Tasks />
      <Modal />
    </div>
  </div>
);

export default TodoPage;
