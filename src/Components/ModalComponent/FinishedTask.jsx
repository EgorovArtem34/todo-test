import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Form, Button } from 'react-bootstrap';
import { closeModal } from '../../slices/modalsSlice';
import { updateTaskStatus } from '../../slices/tasksSlice';

const FinishedTask = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(({ tasksSlice }) => tasksSlice.tasks);
  const currentTaskId = useSelector(({ modalsSlice }) => modalsSlice.id);
  const [currentTask] = tasks.filter((task) => task.id === currentTaskId);
  const setCloseModal = () => dispatch(closeModal());
  const isWorkingStatus = (task) => task.status === 'working';
  const modalText = isWorkingStatus(currentTask) ? 'Отменить задачу выполненной?' : 'Снять отметки о выполнении задачи';
  const newStatus = isWorkingStatus(currentTask) ? 'finished' : 'working';
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTaskStatus({ status: newStatus, id: currentTaskId }));
    setCloseModal();
  };

  return (
    <Modal show centered onHide={setCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Смена статуса задачи</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <p className="lead">{modalText}</p>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={setCloseModal}>
              Отменить
            </Button>
            <Button type="submit" variant="primary">
              Подтвердить
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default FinishedTask;
