import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../Present/Loader";
import {putAbout, clearError} from "../../../store/departmentSlice";

import * as Yup from "yup";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {Formik, Form, ErrorMessage} from "formik";
import ModalError from "../../Modals/ModalError";

const AboutEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.department.loading);
  const error = useSelector((state) => state.department.error);
  const about = useSelector((state) => state.department.about);

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required(
      `Поле "Название подразделения" обязательно для заполнения`
    ),
    text: Yup.string().required(
      `Поле "Описание подразделения" обязательно для заполнения`
    ),
  });

  let content = (
    <Formik
      initialValues={{
        name: about.name,
        text: about.text,
        type: about.type,
        id: about.id,
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        dispatch(putAbout(values));
        navigate(`/department`);
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
            <FormLabel>Описание подразделения</FormLabel>
            <FormControl
              as="textarea"
              rows={8}
              name="text"
              value={values.text}
              onChange={handleChange}
              onInput={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.text}
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
  );

  if (error.show)
    return (
      <ModalError
        show={error.show}
        errText={error.text}
        handleClose={() => {
          dispatch(clearError());
        }}
      />
    );
  if (loading) return <Loader/>;
  return content;
};

export default AboutEdit;
