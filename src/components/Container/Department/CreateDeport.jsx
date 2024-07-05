import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {createDeport, getAllDeport} from "../../../store/departmentSlice";

import * as Yup from "yup";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {Formik, Form, ErrorMessage} from "formik";
import Bread from "../Bread";

const CreateDeport = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required(
      `Поле "Название подразделения" обязательно для заполнения`
    ),
    text: Yup.string().required(
      `Поле "Описание подразделения" обязательно для заполнения`
    ),
  });

  return (
    <>
      <Bread/>
      <Formik
        initialValues={{
          name: '',
          text: '',
          type: '',
          id: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          dispatch(createDeport({nameDeport: values.name, textDeport: values.text})).then(() => {
            dispatch(getAllDeport());
            navigate(`/contacts`);
          });
        }}
      >
        {({
            values,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
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
                style={{width: '300px'}}
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
                style={{width: '300px'}}
              />
              <FormControl.Feedback type="invalid">
                <ErrorMessage name="text"/>
              </FormControl.Feedback>
            </FormGroup>

            <Button
              type="submit"
              variant="success"
              className="me-3"
              disabled={isSubmitting}
            >
              Отправить
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateDeport;
