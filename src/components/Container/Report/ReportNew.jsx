import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

import {postReport, clearError} from "../../../store/reportSlice";

import Loader from "../../Present/Loader";
import ModalError from "../../Modals/ModalError";

import * as Yup from "yup";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {Formik, Form, ErrorMessage} from "formik";

const ReportNew = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.report.loading);
  const error = useSelector((state) => state.report.error);

  const SignupSchema = Yup.object().shape({
    nameOtchet: Yup.string().required(
      `Поле "Отчет" обязательно для заполнения`
    ),
    url: Yup.string().required(`Поле "URL" обязательно для заполнения`),
    contentOtchet: Yup.string()
      .required(`Поле "Содержание" обязательно для заполнения`)
      .max(255, `Поле "Содержание" должно быть не больше 255 символов`),
    period: Yup.string().required(
      `Поле "Периодичность обновления" обязательно для заполнения`
    ),
    otvetstv: Yup.string().required(
      `Поле "Ответственный за обновление" обязательно для заполнения`
    ),
    architect: Yup.string().required(
      `Поле "Архитектор данных" обязательно для заполнения`
    ),
    metodolog: Yup.string().required(
      `Поле "Методология данных" обязательно для заполнения`
    ),
  });

  let content = (
    <Formik
      initialValues={{
        nameOtchet: "",
        contentOtchet: "",
        period: "",
        otvetstv: "",
        architect: "",
        metodolog: "",
        url: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        dispatch(postReport({values}));
        navigate(`/report`);
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
            <FormLabel>Отчет</FormLabel>
            <FormControl
              type="text"
              name="nameOtchet"
              value={values.nameOtchet}
              onChange={handleChange}
              onInput={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.nameOtchet}
              className="d-flex border p-2 rounded"
            />

            <FormControl.Feedback type="invalid">
              <ErrorMessage name="nameOtchet"/>
            </FormControl.Feedback>
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>URL</FormLabel>
            <FormControl
              type="text"
              name="url"
              value={values.url}
              onChange={handleChange}
              onInput={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.url}
              className="d-flex border p-2 rounded"
            />

            <FormControl.Feedback type="invalid">
              <ErrorMessage name="url"/>
            </FormControl.Feedback>
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Содержание</FormLabel>
            <FormControl
              type="text"
              name="contentOtchet"
              value={values.contentOtchet}
              onChange={handleChange}
              onInput={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.contentOtchet}
              className="d-flex border p-2 rounded"
            />

            <FormControl.Feedback type="invalid">
              <ErrorMessage name="contentOtchet"/>
            </FormControl.Feedback>
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Периодичность обновления</FormLabel>
            <FormControl
              type="text"
              name="period"
              value={values.period}
              onChange={handleChange}
              onInput={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.period}
              className="d-flex border p-2 rounded"
            />

            <FormControl.Feedback type="invalid">
              <ErrorMessage name="period"/>
            </FormControl.Feedback>
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Ответственный за обновление</FormLabel>
            <FormControl
              type="text"
              name="otvetstv"
              value={values.otvetstv}
              onChange={handleChange}
              onInput={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.otvetstv}
              className="d-flex border p-2 rounded"
            />

            <FormControl.Feedback type="invalid">
              <ErrorMessage name="otvetstv"/>
            </FormControl.Feedback>
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Архитектор данных</FormLabel>
            <FormControl
              type="text"
              name="architect"
              value={values.architect}
              onChange={handleChange}
              onInput={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.architect}
              className="d-flex border p-2 rounded"
            />

            <FormControl.Feedback type="invalid">
              <ErrorMessage name="architect"/>
            </FormControl.Feedback>
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Методология данных</FormLabel>
            <FormControl
              type="text"
              name="metodolog"
              value={values.metodolog}
              onChange={handleChange}
              onInput={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.metodolog}
              className="d-flex border p-2 rounded"
            />

            <FormControl.Feedback type="invalid">
              <ErrorMessage name="metodolog"/>
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

export default ReportNew;
