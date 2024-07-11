import {Button, Image} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import parse from "html-react-parser";
import {
  getPostByID,
  clearError,
  delPost,
  clearIcon,
} from "../../../store/postSlice";
import Loader from "../../Present/Loader";
import {Icon} from "@iconify/react";
import TokenService from "../../../services/token.service";
import ModalError from "../../Modals/ModalError";
import ModalDel from "../../Modals/ModalDel";
import ModalClearIcon from "../../Modals/ModalClearIcon";

const PostMain = () => {
  const {id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPostByID(id));
  }, [dispatch, id]);

  const [showDel, setShowDel] = useState(false);
  const handleShowDel = () => setShowDel(true);
  const handleCloseDel = () => setShowDel(false);

  const [showIcon, setShowIcon] = useState(false);
  const handleShowIcon = () => setShowIcon(true);
  const handleCloseIcon = () => setShowIcon(false);

  const post = useSelector((state) => state.post.post);
  const loading = useSelector((state) => state.post.loading);
  const error = useSelector((state) => state.post.error);
  const visibleAdmin = TokenService.isHaveRole("ROLE_ADMIN");
  const visibleEditor = TokenService.isHaveRole("ROLE_EDITOR");

  const handleDeleteIcon = () => {
    handleCloseIcon();
    dispatch(
      clearIcon({
        id,
        content: post.content,
        values: {headline: post.headline, shortText: post.shortText},
      })
    );
    navigate(`/posts/${id}`);
  };

  const handleEdit = () => {
    navigate(`/posts/edit/${id}`);
  };

  const handleDelete = () => {
    dispatch(delPost(id));
    handleCloseDel();
    navigate(`/posts/`);
  };

  const handleBack = () => navigate(`/posts/`)

  let content = (
    <>
      <ModalDel
        show={showDel}
        handleClose={handleCloseDel}
        handleAction={handleDelete}
      />

      <ModalClearIcon
        show={showIcon}
        handleClose={handleCloseIcon}
        handleAction={handleDeleteIcon}
      />

      <div className="post">
        <Button
          style={{backgroundColor: "#34606BFF", border: "none"}}
          className={visibleAdmin || visibleEditor ? `visually-hidden` : `me-2 my-2`}
          variant={visibleAdmin || visibleEditor ? `primary` : `success`}
          onClick={handleBack}
        >
          <Icon icon="mi:arrow-left"/>Назад
        </Button>
        {visibleAdmin || visibleEditor ? (
          <div className="dep_blockAbout">
            <div>
              <Button
                className="me-2 my-2"
                variant={`primary`}
                onClick={handleBack}
              >
                <Icon icon="mi:arrow-left"/>Назад
              </Button>
              <Button
                variant="warning"
                onClick={handleShowIcon}
                className="me-2 my-2"
              >
                <Icon icon="ph:pencil-fill"/> Очистить иконку новости
              </Button>

              <Button
                variant="success"
                onClick={handleEdit}
                className="my-2 me-2"
              >
                <Icon icon="ph:pencil-fill"/> Редактировать
              </Button>

              <Button variant="danger" onClick={handleShowDel} className="my-2">
                <Icon icon="ph:pencil-fill"/> Удалить
              </Button>
            </div>
          </div>
        ) : null}

        <div className="post_header">
          {post.mainIcon ? (
            <Image
              className="main_post_header_image"
              src={`data:image/jpeg;base64,${post.mainIcon}`}
            />
          ) : null}
          <span className="post_header_headline">{post.headline}</span>
          <span className="post_header_public">{post.datePublic}</span>
        </div>

        <hr></hr>

        <div className="post_main">
          <b>{post.shortText}</b>
        </div>

        <hr></hr>

        <div className="post_main">{parse(post.content || "")}</div>

        <hr></hr>

        <div className="post_footer">
          <span>Автор:</span>
          {post.fioAuthor || ""} т. {post.phone || ""}
        </div>
      </div>
    </>
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

export default PostMain;
