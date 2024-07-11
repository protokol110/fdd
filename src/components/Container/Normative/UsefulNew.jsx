import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {postNewUseful, clearError} from "../../../store/normativeSlice";
import Loader from "../../Present/Loader";
import ModalError from "../../Modals/ModalError";
import * as Yup from "yup";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {Formik, Form, ErrorMessage} from "formik";

const SignupSchema = Yup.object().shape({
  zagolovok: Yup.string()
    .required(`Поле "Название документа" обязательно для заполнения`)
    .max(255, `Поле "Название документа" должно быть не больше 255 символов`),
});

const UsefulNew = () => {
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
        zagolovok: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        dispatch(postNewUseful({files, values}));
        navigate(`/educ`);
      }}
    >
      {({values, errors, isSubmitting, handleChange, handleBlur, handleSubmit}) => (
        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-3">
            <FormLabel>Название документа</FormLabel>
            <FormControl
              type="text"
              name="zagolovok"
              value={values.zagolovok}
              onChange={handleChange}
              onInput={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.zagolovok}
              className="d-flex border p-2 rounded"
            />
            <FormControl.Feedback type="invalid">
              <ErrorMessage name="zagolovok"/>
            </FormControl.Feedback>
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Документы</FormLabel>
            <FormControl
              type="file"
              size="sm"
              className="mb-3"
              name="files"
              multiple
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

export default UsefulNew;
