import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {updateLink, deleteLink, getLinks} from '../../../store/linksSlice';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import Loader from "../../Present/Loader";
import ModalError from "../../Modals/ModalError";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Required')
    .max(255, 'Must be 255 characters or less'),
  description: Yup.string()
    .required('Required')
    .max(599, 'Must be 255 characters or less'),
});

const EditLinks = () => {
  const dispatch = useDispatch();
  const {loading, error, links} = useSelector((state) => state.links);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    dispatch(getLinks());
  }, [dispatch]);

  const link = links.find(link => link.id === Number(id));

  const content = (
    <Formik
      initialValues={{name: link.name, description: link.description}}
      validationSchema={validationSchema}
      onSubmit={(values, {setSubmitting}) => {
        dispatch(updateLink({name: values.name, description: values.description, id: id}));
        setSubmitting(false);
        navigate('/links')
      }}
    >
      {({values, errors, isSubmitting, handleChange, handleBlur, handleSubmit}) => (
        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-3">
            <FormLabel>Название</FormLabel>
            <FormControl
              as={Field}
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              onInput={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.name}
              className="d-flex border p-2 rounded"
            />
            <FormControl.Feedback type="invalid">
              <ErrorMessage name="name"/>
            </FormControl.Feedback>
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Ссылка</FormLabel>
            <FormControl
              as={Field}
              type="text"
              name="description"
              value={values.description}
              onChange={handleChange}
              onInput={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.description}
              className="d-flex border p-2 rounded"
            />
            <FormControl.Feedback type="invalid">
              <ErrorMessage name="description"/>
            </FormControl.Feedback>
          </FormGroup>

          <Button
            type="submit"
            variant="success"
            className="me-3"
            disabled={isSubmitting}
          >
            Обновить
          </Button>
          <Button
            variant="danger"
            className="me-3"
            onClick={() => {
              dispatch(deleteLink({id: link.id}));
              navigate('/links');
            }}
          >
            Удалить
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              navigate('/links');
            }}
          >
            Назад
          </Button>
        </Form>
      )}
    </Formik>
  );

  return error.show ? (
    <ModalError
      show={error.show}
      errText={error.text}
    />
  ) : loading ? <Loader/> : content;
};

export default EditLinks;
