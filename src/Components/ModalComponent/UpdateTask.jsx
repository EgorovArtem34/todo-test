import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Typeahead as Spearhead } from 'react-bootstrap-typeahead';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { closeModal } from '../../slices/modalsSlice';
import { updateTask } from '../../slices/tasksSlice';

const UpdateTask = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(({ tasksSlice }) => tasksSlice.tasks);
  const currentTaskId = useSelector(({ modalsSlice }) => modalsSlice.id);
  const [currentTask] = tasks.filter((task) => task.id === currentTaskId);
  const setCloseModal = () => dispatch(closeModal());
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const signUpSchema = yup.object().shape({
    name: yup.string()
      .trim()
      .min(3, 'не менее 3 и не более 20 символов')
      .max(20, 'не менее 3 и не более 20 символов')
      .required('обязательное поле'),
    description: yup.string()
      .trim()
      .min(2, 'не менее 2 и не более 20 символов')
      .max(20, 'не менее 2 и не более 20 символов'),
  });
  const formik = useFormik({
    initialValues: {
      name: currentTask.name,
      description: currentTask.description,
    },
    validationSchema: signUpSchema,
    onSubmit: () => {
      const { name, description } = formik.values;
      dispatch(updateTask({ id: currentTaskId, name, description }));
      setCloseModal();
    }
  })
  const descriptions = ['раз', 'два', 'три'];
  return (
    <Modal show centered onHide={setCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Обновить задачу</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label htmlFor="name">Имя задачи</Form.Label>
            <Form.Control
              required
              ref={inputRef}
              onChange={formik.handleChange}
              placeholder="Введите имя задачи"
              onBlur={formik.handleBlur}
              type="text"
              value={formik.values.name}
              autoComplete="on"
              name="name"
              id="name"
              className="mb-2"
              isInvalid={formik.touched.name && formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Описание задачи</Form.Label>
            <Spearhead
              id="description"
              name="description"
              multiple={false}
              labelKey="description"
              options={descriptions}
              type="text"
              defaultSelected={[formik.values.description]}
              placeholder="Введите описание"
              emptyLabel="Нет совпадений"
              onChange={(selected) => {
                const value = selected.length > 0 ? selected[0].user : "";
                formik.setFieldValue('description', value);
              }}
              onInputChange={(text) => {
                formik.setFieldValue("description", text);
                formik.setFieldTouched("description", true);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  formik.submitForm();
                }
              }}
              onBlur={() => {
                formik.setFieldTouched("description", true);
              }}
              isInvalid={!!formik.touched.description && !!formik.errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.description}
            </Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer>
            <Button variant="secondary" className="me-2" onClick={setCloseModal}>
              Отменить
            </Button>
            <Button variant="primary" type="submit" className="me-2">
              Подтвердить
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default UpdateTask;
