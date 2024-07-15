import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrPage, getSearch, clearError} from "../../../store/postSlice";
import {Pagination} from "react-bootstrap";
import PostRow from "./PostRow";
import Loader from "../../Present/Loader";
import ModalError from "../../Modals/ModalError";

const PostSearchBlock = () => {
  const dispatch = useDispatch();

  const currPage = useSelector((state) => state.post.currPage);
  const posts = useSelector((state) => state.post.postsSearch);
  const loading = useSelector((state) => state.post.loading);
  const error = useSelector((state) => state.post.error);
  const totalPages = useSelector((state) => state.post.totalPages);
  const searchStatus = useSelector((state) => state.post.searchStatus);

  useEffect(() => {
    dispatch(getSearch());
  }, [searchStatus, currPage, dispatch]);

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

export default PostSearchBlock;
