import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { closeModal } from '../../slices/modalsSlice';
import { updateTaskStatus } from '../../slices/tasksSlice';

const FinishedTask = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const tasks = useSelector(({ tasksSlice }) => tasksSlice.tasks);
  const currentTaskId = useSelector(({ modalsSlice }) => modalsSlice.id);
  const [currentTask] = tasks.filter((task) => task.id === currentTaskId);
  const setCloseModal = () => dispatch(closeModal());
  const isWorkingStatus = (task) => task.status === 'active';
  const modalText = isWorkingStatus(currentTask) ? t('finishedTask.isFinished') : t('finishedTask.removeFinished');
  const newStatus = isWorkingStatus(currentTask) ? 'finished' : 'active';
  const handleSubmit = () => {
    dispatch(updateTaskStatus({ status: newStatus, id: currentTaskId }));
    setCloseModal();
  };

  return (
    <Modal show centered onHide={setCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{t('finishedTask.changeStatus')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="lead">{modalText}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" className="me-2" onClick={setCloseModal}>
          {t('btn.cancel')}
        </Button>
        <Button type="submit" variant="primary" onClick={handleSubmit}>
          {t('btn.confirm')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default FinishedTask;
