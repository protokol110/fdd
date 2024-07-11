import React, {useCallback} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

import * as Yup from "yup";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {ErrorMessage, Form, Formik} from "formik";

import TokenService from "../../../services/token.service";
import {clearError, setError} from "../../../store/mainSlice";

import ModalError from "../../Modals/ModalError";

const SignupSchema = Yup.object().shape({
  username: Yup.string()
    .length(9, "Имя пользователя вводится в формате b12345678")
    .required(`Поле "Логин" обязательно для заполнения`),
  password: Yup.string().required(`Поле "Пароль" обязательно для заполнения`),
});

async function login(values, navigate, dispatch) {
  try {
    let data = {
      tbn: values.username,
      password: values.password,
      site: `${process.env.REACT_APP_SITE_NAME}`,
    };

    return await axios
      .post(`${process.env.REACT_APP_HTTP_URL}/login`, data)
      .then((response) => {
        TokenService.setAccessToken(response.data.token);
        TokenService.setUser(atob(response.data.token.split(".")[1]));
        navigate(`/`);
      });
  } catch (err) {
    if (err.response.data === "Ошибка аутентификации в AD") {
      dispatch(setError("Введен неверный логин или пароль!"));
    }
  }
}

const AuthPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const error = useSelector((state) => state.main.error);

  const handleClose = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  let content = (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        login(values, navigate, dispatch);
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
        <Form onSubmit={handleSubmit} className="auth_block">
          <div className="auth_block_form">
            <FormGroup className="mb-3">
              <FormLabel>Логин</FormLabel>
              <FormControl
                type="text"
                name="username"
                placeholder="b********"
                value={values.username}
                onChange={handleChange}
                onInput={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.username}
              />

              <FormControl.Feedback type="invalid">
                <ErrorMessage name="username"/>
              </FormControl.Feedback>
            </FormGroup>

            <FormGroup className="mb-3">
              <FormLabel>Пароль</FormLabel>
              <FormControl
                type="password"
                name="password"
                placeholder="********"
                value={values.password}
                onChange={handleChange}
                onInput={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.password}
              />

              <FormControl.Feedback type="invalid">
                <ErrorMessage name="password"/>
              </FormControl.Feedback>
            </FormGroup>

            <div className="auth_block_buttons">
              <Button
                type="submit"
                variant="success"
                className={`me-3 colorNew`}
                disabled={isSubmitting}
              >
                Войти
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );

  if (error.show)
    return (
      <ModalError
        show={error.show}
        errText={error.text}
        handleClose={handleClose}
      />
    );
  return content;
};

export default AuthPage;
