import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  getArhPostsByDesc,
  setCurrPage,
  clearError,
} from "../../../store/postSlice";
import {Pagination} from "react-bootstrap";
import PostRow from "./PostRow";
import Loader from "../../Present/Loader";
import Bread from "../Bread";
import ModalError from "../../Modals/ModalError";

const PostsArhBlock = () => {
  const currPage = useSelector((state) => state.post.currPage);
  const posts = useSelector((state) => state.post.postsPage);
  const currArhYear = useSelector((state) => state.post.currArhYear);
  const postsArhYears = useSelector((state) => state.post.postsArhYears);
  const loading = useSelector((state) => state.post.loading);
  const error = useSelector((state) => state.post.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getArhPostsByDesc({
        isInitial: postsArhYears.length === 0,
      })
    );
  }, [dispatch, currPage, currArhYear, postsArhYears]);

  const totalPages = useSelector((state) => state.post.totalPages);

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

      {posts.map((post) => {
        return <PostRow post={post} key={post.id}/>;
      })}

      <div className="post_pagination">
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

export default PostsArhBlock;
