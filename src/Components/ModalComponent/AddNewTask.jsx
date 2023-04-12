import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { Typeahead as Spearhead } from 'react-bootstrap-typeahead';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import { closeModal } from '../../slices/modalsSlice';
import { addTask } from '../../slices/tasksSlice';
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
  const dispatch = useDispatch();
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
      name: '',
      category: '',
    },
    validationSchema: signUpSchema,
    onSubmit: () => {
      const { name, category } = formik.values;
      const id = uuidv4();
      dispatch(addTask({ id, name, category, status: 'working' }));
      setCloseModal();
    }
  })
  const categories = ['раз', 'два', 'три'];
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
          <Form.Group controlId="category">
            <Form.Label>Категория задачи</Form.Label>
            <Spearhead
              id="category"
              name="category"
              multiple={false}
              labelKey="category"
              options={categories}
              placeholder="Введите категорию"
              emptyLabel="Нет похожих категорий"
              onChange={(selected) => {
                const value = selected.length > 0 ? selected[0].user : "";
                formik.setFieldValue('category', value);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  formik.submitForm();
                }
              }}
              onInputChange={(text) => {
                formik.setFieldValue("category", text);
                formik.setFieldTouched("category", true);
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
export default AddTask;
