import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {
  getAllPostsByDesc,
  setCurrPage,
  clearError,
} from "../../../store/postSlice";
import {Pagination, Button} from "react-bootstrap";
import PostRow from "./PostRow";
import TokenService from "../../../services/token.service";
import Loader from "../../Present/Loader";
import Bread from "../Bread";
import ModalError from "../../Modals/ModalError";

const PostsBlock = () => {
  const currPage = useSelector((state) => state.post.currPage);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllPostsByDesc());
  }, [dispatch, currPage]);

  const posts = useSelector((state) => state.post.postsPage) || [];
  const loading = useSelector((state) => state.post.loading);
  const error = useSelector((state) => state.post.error);
  const totalPages = useSelector((state) => state.post.totalPages);
  const visibleAdmin = TokenService.isHaveRole("ROLE_ADMIN");
  const visibleEditor = TokenService.isHaveRole("ROLE_EDITOR");

  let pages = [];
  for (let number = 1; number <= totalPages; number++) {
    pages.push(
      <Pagination.Item
        key={number}
        active={number === currPage}
        onClick={() => {
          dispatch(setCurrPage(number));
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  let content = (
    <>
      <Bread/>

      {visibleAdmin || visibleEditor ? (
        <Button
          variant="success"
          type="submit"
          className="mb-3"
          onClick={() => {
            navigate(`/posts/new`);
          }}
          style={{backgroundColor: "#34606BFF", border: "none"}}
        >
          Добавить
        </Button>
      ) : null}

      {posts.map((post) => {
        return <PostRow post={post} key={post.id}/>;
      })}

      <div className="link_pagination">
        <Pagination>{pages}</Pagination>
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

export default PostsBlock;
