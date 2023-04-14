import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Typeahead as Spearhead } from 'react-bootstrap-typeahead';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { closeModal } from '../../slices/modalsSlice';
import { addTask } from '../../slices/tasksSlice';

const AddTask = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(({ tasksSlice }) => tasksSlice.tasks);
  const descriptions = tasks.map((task) => task.description).filter(Boolean);
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
      name: '',
      description: '',
    },
    validationSchema: signUpSchema,
    onSubmit: () => {
      const { name, description } = formik.values;
      const id = uuidv4();
      dispatch(addTask({
        id, name, description, status: 'active',
      }));
      setCloseModal();
    },
  });
  return (
    <Modal show centered onHide={setCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Создать задачу</Modal.Title>
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
              placeholder="Добавьте описание"
              emptyLabel="Нет совпадений"
              onChange={(selected) => {
                const value = selected.length > 0 ? selected[0].user : '';
                formik.setFieldValue('description', value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  formik.submitForm();
                }
              }}
              onInputChange={(text) => {
                formik.setFieldValue('description', text);
                formik.setFieldTouched('description', true);
              }}
              onBlur={() => {
                formik.setFieldTouched('description', true);
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
export default AddTask;
