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
    category: yup.string()
      .trim()
      .min(2, 'не менее 2 и не более 20 символов')
      .max(20, 'не менее 2 и не более 20 символов'),
  });
  const formik = useFormik({
    initialValues: {
      name: currentTask.name,
      category: currentTask.category,
    },
    validationSchema: signUpSchema,
    onSubmit: () => {
      const { name, category } = formik.values;
      dispatch(updateTask({ id: currentTaskId, name, category, status: 'working' }));
      setCloseModal();
    }
  })
  const categories = ['раз', 'два', 'три'];
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
          <Form.Group controlId="category">
            <Form.Label>Категория задачи</Form.Label>
            <Spearhead
              id="category"
              name="category"
              multiple={false}
              labelKey="category"
              options={categories}
              type="text"
              defaultSelected={[formik.values.category]}
              placeholder="Введите категорию"
              emptyLabel="Нет похожих категорий"
              onChange={(selected) => {
                const value = selected.length > 0 ? selected[0].user : "";
                formik.setFieldValue('category', value);
              }}
              onInputChange={(text) => {
                formik.setFieldValue("category", text);
                formik.setFieldTouched("category", true);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  formik.submitForm();
                }
              }}
              onBlur={() => {
                formik.setFieldTouched("category", true);
              }}
              isInvalid={!!formik.touched.category && !!formik.errors.category}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.category}
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
