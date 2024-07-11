import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {Formik, Form, ErrorMessage} from "formik";
import * as Yup from "yup";

import {updateDeport, deleteDeport, getAllDeport} from "../../../store/departmentSlice";
import Bread from "../Bread";
import Loader from "../../Present/Loader";

const EditDep = () => {
  const {id} = useParams();
  const [department, setDepartment] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const departments = useSelector((state) => state.department.depAll);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (departments.length > 0) {
      const departmentId = Number(id);
      const foundDepartment = departments.find((dep) => dep.id === departmentId);
      setDepartment(foundDepartment);
      setLoading(false);
    }
  }, [dispatch, departments, id]);

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Название подразделения обязательно для заполнения"),
    text: Yup.string().required("Описание подразделения обязательно для заполнения"),
  });

  const handleUpdate = (values) => {
    dispatch(updateDeport({id: department.id, name: values.name, description: values.text})).then(() => {
      navigate(`/contacts`);
    });
  };

  const handleDelete = async () => {
    await dispatch(deleteDeport(department.id));
    await dispatch(getAllDeport());
    navigate(`/contacts`);
  };

  if (loading) {
    return <Loader/>;
  }

  return (
    <>
      <Bread/>
      <Formik
        initialValues={{
          name: department ? department.nameDeport : "",
          text: department ? department.textDeport : "",
        }}
        validationSchema={SignupSchema}
        onSubmit={handleUpdate}
      >
        {({values, errors, isSubmitting, handleChange, handleBlur, handleSubmit}) => (
          <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-3">
              <FormLabel>Название подразделения</FormLabel>
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
              <FormLabel>Описание подразделения</FormLabel>
              <FormControl
                as="textarea"
                rows={3}
                name="text"
                value={values.text}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.text}
                style={{width: "300px"}}
              />
              <FormControl.Feedback type="invalid">
                <ErrorMessage name="text"/>
              </FormControl.Feedback>
            </FormGroup>

            <Button type="submit" variant="success" className="me-3" disabled={isSubmitting} style={{
              backgroundColor: "rgba(52, 96, 107, 1)",
              marginBottom: "10px"
            }}>
              Обновить
            </Button>
            <Button type="button" variant="danger" onClick={handleDelete}>
              Удалить
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditDep;
