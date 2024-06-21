import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {postNewOrder, clearError} from "../../../store/departmentSlice";
import Loader from "../../Present/Loader";

import * as Yup from "yup";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {Formik, Form, ErrorMessage} from "formik";
import ModalError from "../../Modals/ModalError";

const OrderNew = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.department.loading);
  const error = useSelector((state) => state.department.error);
  const [files, setFiles] = useState();

  const handleChangeFiles = (event) => {
    setFiles([...event.target.files]);
  };

  const SignupSchema = Yup.object().shape({
    dateUtv: Yup.date()
      .required(`Поле "Дата утверждения" обязательно для заполнения`)
      .max(new Date(), `"Дата утверждения" не может быть больше текущей`),
    nameDocument: Yup.string()
      .required(`Поле "Название документа" обязательно для заполнения`)
      .max(255, `Поле "Название документа" должно быть не больше 255 символов`),
  });

  let content = (
    <Formik
      initialValues={{
        dateUtv: "",
        nameDocument: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        dispatch(postNewOrder({files, values}));
        navigate(`/order`);
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
            <FormLabel>Дата утверждения</FormLabel>
            <FormControl
              type="date"
              name="dateUtv"
              value={values.dateUtv}
              onChange={handleChange}
              onInput={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.dateUtv}
              className="d-flex border p-2 rounded"
            />

            <FormControl.Feedback type="invalid">
              <ErrorMessage name="dateUtv"/>
            </FormControl.Feedback>
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Название документа</FormLabel>
            <FormControl
              type="text"
              name="nameDocument"
              value={values.nameDocument}
              onChange={handleChange}
              onInput={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.nameDocument}
              className="d-flex border p-2 rounded"
            />

            <FormControl.Feedback type="invalid">
              <ErrorMessage name="nameDocument"/>
            </FormControl.Feedback>
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Документ</FormLabel>
            <FormControl
              type="file"
              size="sm"
              className="mb-3"
              name="files"
              onChange={handleChangeFiles}
            />
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

export default OrderNew;
