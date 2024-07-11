import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {postNewNPA, clearError} from "../../../store/normativeSlice";
import Loader from "../../Present/Loader";
import ModalError from "../../Modals/ModalError";
import * as Yup from "yup";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {Formik, Form, ErrorMessage} from "formik";

const SignupSchema = Yup.object().shape({
  dateUtv: Yup.date()
    .required(`Поле "Дата утверждения" обязательно для заполнения`)
    .max(new Date(), `"Дата утверждения" не может быть больше текущей`),
  nameDocument: Yup.string()
    .required(`Поле "Название документа" обязательно для заполнения`)
    .max(255, `Поле "Название документа" должно быть не больше 255 символов`),
});

const NPANew = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [files, setFiles] = useState();
  const {loading, error} = useSelector((state) => state.normative);

  const handleChangeFiles = (event) => {
    setFiles([...event.target.files]);
  };

  const content = (
    <Formik
      initialValues={{
        dateUtv: "",
        nameDocument: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        dispatch(postNewNPA({files, values}));
        navigate(`/playbook`);
      }}
    >
      {({values, errors, isSubmitting, handleChange, handleBlur, handleSubmit}) => (
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
            style={{backgroundColor: "#34606BFF", border: "none", marginBottom:"10px"}}
          >
            Отправить
          </Button>
        </Form>
      )}
    </Formik>
  );

  return error.show ? (
    <ModalError
      show={error.show}
      errText={error.text}
      handleClose={() => dispatch(clearError())}
    />
  ) : loading ? <Loader/> : content;
};

export default NPANew;
