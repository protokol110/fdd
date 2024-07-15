import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {Editor} from "@tinymce/tinymce-react";
import * as Yup from "yup";
import {Button, FormControl, FormGroup, FormLabel} from "react-bootstrap";
import {ErrorMessage, Form, Formik} from "formik";

import {clearError, editPost, getPostByID} from "../../../store/postSlice";
import Loader from "../../Present/Loader";
import ModalError from "../../Modals/ModalError";
import instance from "../../../services/http.service";

const configValue = {
  language: "ru",
  height: 420,
  plugins: [
    "advlist",
    "autolink",
    "autosave",
    "directionality",
    "lists",
    "link",
    "image",
    "charmap",
    "preview",
    "anchor",
    "searchreplace",
    "code",
    "fullscreen",
    "insertdatetime",
    "media",
    "table",
    "help",
  ],
  toolbar:
    "undo redo | blocks | " +
    "bold italic backcolor | alignleft aligncenter " +
    "alignright alignjustify | bullist numlist outdent indent | " +
    "removeformat | help",
  content_style:
    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
  images_upload_url: "http://uedweb.asb.by/bezop-api/v1/fileurl",
  automatic_uploads: true,
};

const PostEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();
  const editorRef = useRef(null);
  const [editorContent, setEditorContent] = useState();
  const [icon, setIcon] = useState([]);

  useEffect(() => {
    dispatch(getPostByID(id));
  }, [dispatch, id]);

  configValue.images_upload_handler = useCallback(async (blobInfo) => {
    let formData = new FormData();
    formData.append("files", blobInfo.blob(), blobInfo.filename());

    try {
      const res = await instance.post(
        "http://uedweb.asb.by/bezop-api/v1/fileurl",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data && res.data.url) {
        return res.data.url;
      } else {
        throw new Error("Невозможно загрузить изображение");
      }
    } catch (err) {
      throw new Error("Невозможно загрузить изображение");
    }
  }, []);

  const loading = useSelector((state) => state.post.loading);
  const error = useSelector((state) => state.post.error);
  const post = useSelector((state) => state.post.post);

  const handleEditorChange = () => {
    if (editorRef.current) {
      setEditorContent(editorRef.current.getContent());
    }
  };

  const handleChangeIcon = (event) => {
    setIcon([...event.target.files]);
  };

  const SignupSchema = Yup.object().shape({
    headline: Yup.string()
      .required(`Поле "Заголовок" обязательно для заполнения`)
      .max(255, `Поле "Заголовок" должно быть не больше 255 символов`),
    shortText: Yup.string()
      .required(`Поле "Краткое содержание" обязательно для заполнения`)
      .max(255, `Поле "Краткое содержание" должно быть не больше 255 символов`),
  });

  let content = (
    <Formik
      initialValues={{
        headline: post.headline,
        shortText: post.shortText,
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        dispatch(
          editPost({
            id,
            icon,
            content: editorContent,
            values,
          })
        );
        navigate(`/posts`);
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
            <FormLabel>Иконка новости</FormLabel>
            <FormControl
              type="file"
              size="sm"
              className="mb-2"
              name="icon"
              onChange={handleChangeIcon}
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Заголовок</FormLabel>
            <FormControl
              type="text"
              name="headline"
              placeholder="Заголовок новости"
              value={values.headline}
              onChange={handleChange}
              onInput={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.headline}
              className="d-flex border p-2 rounded"
            />

            <FormControl.Feedback type="invalid">
              <ErrorMessage name="headline"/>
            </FormControl.Feedback>
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Краткое содержание</FormLabel>
            <FormControl
              as="textarea"
              name="shortText"
              placeholder="Не более 255 символов"
              value={values.shortText}
              onChange={handleChange}
              onInput={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.shortText}
              className="d-flex border p-2 rounded"
            />

            <FormControl.Feedback type="invalid">
              <ErrorMessage name="shortText"/>
            </FormControl.Feedback>
          </FormGroup>

          <FormGroup className="mb-3">
            <FormLabel>Текст новости</FormLabel>
            <Editor
              apiKey='ut553oi1gjlzjgu4z71eyju7zz0vak1yktlj43kj3svpupv9'
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={post.content}
              init={configValue}
              onEditorChange={handleEditorChange}
            />
          </FormGroup>

          <div className="mb-2">
            <Button
              type="submit"
              variant="success"
              className="me-3"
              disabled={isSubmitting}
              style={{backgroundColor: "#34606BFF", border: "none"}}
            >
              Отправить
            </Button>
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
        handleClose={() => {
          dispatch(clearError());
        }}
      />
    );
  if (loading) return <Loader/>;
  return content;
};

export default PostEdit;
