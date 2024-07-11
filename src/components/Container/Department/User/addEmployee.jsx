import React from "react";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {Formik, Form, ErrorMessage} from "formik";
import * as Yup from "yup";

import {createUser} from "../../../../store/userSlice";

const AddEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { idDep } = useParams();

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Имя сотрудника обязательно для заполнения"),
    phone: Yup.string().required("Телефон сотрудника обязателен для заполнения"),
    description: Yup.string().required("Вопросы по которым можно обращаться к сотруднику обязательно для заполнения"),
    position: Yup.string().required("Должность сотрудника обязательна для заполнения"),
  });

  const handleCreate = (values) => {
    dispatch(createUser({...values})).then(() => {
      navigate(`/contacts`);
    });
  }

  return (
    <Formik
      initialValues={{
        name: "",
        phone: "",
        description: "",
        position: "",
        idDep,
      }}
      validationSchema={SignupSchema}
      onSubmit={handleCreate}
    >
      {({values, errors, isSubmitting, handleChange, handleBlur, handleSubmit}) => (
        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-3">
            <FormLabel>Имя сотрудника</FormLabel>
            <FormControl
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.name}
            />
            <FormControl.Feedback type="invalid">
              <ErrorMessage name="name"/>
            </FormControl.Feedback>
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Телефон сотрудника</FormLabel>
            <FormControl
              type="text"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.phone}
            />
            <FormControl.Feedback type="invalid">
              <ErrorMessage name="phone"/>
            </FormControl.Feedback>
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Вопросы по которым можно обращаться к сотрудник</FormLabel>
            <FormControl
              as="textarea"
              rows={3}
              name="description"
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.description}
            />
            <FormControl.Feedback type="invalid">
              <ErrorMessage name="description"/>
            </FormControl.Feedback>
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Должность сотрудника</FormLabel>
            <FormControl
              type="text"
              name="position"
              value={values.position}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.position}
            />
            <FormControl.Feedback type="invalid">
              <ErrorMessage name="position"/>
            </FormControl.Feedback>
          </FormGroup>

          <Button type="submit" variant="success" disabled={isSubmitting} style={{
            backgroundColor: "rgba(52, 96, 107, 1)",
            marginBottom: "10px"
          }}>
            Добавить сотрудника
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddEmployee;
