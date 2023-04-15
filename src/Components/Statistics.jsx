import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import getFilteredTasks from '../utils/getFilteredTasks';

const Statistics = () => {
  const { t } = useTranslation();
  const tasks = useSelector(({ tasksSlice }) => tasksSlice.tasks);
  const { active, finished } = getFilteredTasks(tasks);
  return (
    <div className="d-none d-sm-flex col-3 col-md-2 col-sm-3 col-xs-1 px-0 bg-statistics flex-column h-100 d-flex align-items-center rounded border-blue">
      <div className="d-flex pt-3 mb-2">
        <div className="px-3">{t('statistics.title')}</div>
      </div>
      <div className="p-4">
        <ul className="list-unstyled">
          <li className="pb-2">
            {t('statistics.all')}
            :
            {' '}
            {tasks.length}
          </li>
          <li className="pb-2">
            {t('statistics.active')}
            :
            {' '}
            {active.length}
          </li>
          <li className="pb-2">
            {t('statistics.finished')}
            :
            {' '}
            {finished.length}
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Statistics;
