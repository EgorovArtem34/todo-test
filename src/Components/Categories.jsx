

const Categories = () => {
  console.log('1');
  return (
    <div className="d-none d-sm-flex col-3 col-md-2 col-sm-3 col-xs-1 px-0 bg-categories flex-column h-100 d-flex align-items-center rounded border-blue">
      <div className="d-flex mt-4 mb-2">
        <div className="px-3">Categories</div>
      </div>
      <div className="p-4">
        тут будут категории
      </div>
      <div className="mt-auto px-5 py-3">
        <button className="btn-add px-3 py-1" type="submit">
          Добавить категорию
        </button>
      </div>
    </div >
  )
};
export default Categories;
