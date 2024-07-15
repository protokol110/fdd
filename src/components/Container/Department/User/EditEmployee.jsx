import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {Formik, Form, ErrorMessage} from "formik";
import * as Yup from "yup";

import {getUsers, updateUser, deleteUser, getUsersById} from "../../../../store/userSlice";
import Bread from "../../Bread";
import Loader from "../../../Present/Loader";

const EditEmployee = () => {
  const {idDep, idEmp} = useParams();
  const [employee, setEmployee] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const employeeData = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState({
    name: "",
    phone: "",
    description: "",
    position: "",
  });

  useEffect(() => {
    dispatch(getUsersById({id: Number(idEmp)})).then(() => {
      setLoading(false);
    });
  }, [dispatch]);

  useEffect(() => {
    if (!loading && employeeData) {
      setEmployee(employeeData);
      setLoading(false);
    }
  }, [dispatch, employeeData, loading]);

  useEffect(() => {
    if (!loading && employeeData) {
      setEmployee(employeeData);
      setInitialValues({
        name: employeeData.name,
        phone: employeeData.phone,
        description: employeeData.description,
        position: employeeData.position,
      });
      setLoading(false);
    }
  }, [dispatch, employeeData, loading]);

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Имя сотрудника обязательно для заполнения"),
    phone: Yup.string().required("Телефон сотрудника обязателен для заполнения"),
    description: Yup.string().required("Описание сотрудника обязательно для заполнения"),
    position: Yup.string().required("Должность сотрудника обязательна для заполнения"),
  });

  const handleUpdate = (values) => {
    dispatch(updateUser({
      id: employee.id,
      name: values.name,
      phone: values.phone,
      description: values.description,
      position: values.position,
      idDep: idDep
    })).then(() => {
      navigate(`/contacts`);
    });
  };

  const handleDelete = async () => {
    await dispatch(deleteUser({id: employee.id}));
    await dispatch(getUsers());
    navigate(`/contacts`);
  };

  if (loading) {
    return <Loader/>;
  }

  return (
    <>
      <Bread/>
      <Formik
        initialValues={initialValues}
        validationSchema={SignupSchema}
        onSubmit={handleUpdate}
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
                style={{width: "300px"}}
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
                style={{width: "300px"}}
              />
              <FormControl.Feedback type="invalid">
                <ErrorMessage name="phone"/>
              </FormControl.Feedback>
            </FormGroup>
            <FormGroup className="mb-3">
              <FormLabel>Вопросы по которым можно обращаться</FormLabel>
              <FormControl
                as="textarea"
                rows={3}
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.description}
                style={{width: "300px"}}
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
                style={{width: "300px"}}
              />
              <FormControl.Feedback type="invalid">
                <ErrorMessage name="position"/>
              </FormControl.Feedback>
            </FormGroup>

            <Button type="submit" variant="success" className="me-3" disabled={isSubmitting} style={{
              backgroundColor: "rgba(52, 96, 107, 1)",
              marginBottom: "10px",
              border: "none"
            }}>
              Обновить
            </Button>
            <Button type="button" variant="danger" onClick={handleDelete} style={{
              marginBottom: "10px"
            }}>
              Удалить
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditEmployee;
