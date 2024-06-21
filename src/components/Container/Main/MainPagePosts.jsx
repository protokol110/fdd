import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getTop6Posts, clearError} from "../../../store/postSlice";
import Loader from "../../Present/Loader";
import MainPost from "./MainPost";
import OtherPost from "./OtherPost";
import ModalError from "../../Modals/ModalError";
import {Col, Container, Row} from "react-bootstrap";

const MainPagePosts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTop6Posts());
  }, [dispatch]);

  const posts = useSelector((state) => state.post.posts);
  const loading = useSelector((state) => state.post.loading);
  const error = useSelector((state) => state.post.error);

  const mainBlock = (
    <Container fluid={true} className="main_page_block">
      <Col>
        <Row>{posts[0] && <MainPost post={posts[0]}/>}</Row>
        <Row className="horiz"></Row>
        <Row className="main_page_block_left_bot">
          <Col>
            {posts[1] && (
              <OtherPost cssClass="other_post_row" post={posts[1]}/>
            )}
          </Col>

          <Col className="vert"/>

          <Col>
            {posts[2] && (
              <OtherPost cssClass="other_post_row" post={posts[2]}/>
            )}
          </Col>
        </Row>
      </Col>

      <Col className="vert vert_margin"/>

      <Col>
        <Row>
          {posts[3] && <OtherPost cssClass="other_post_col" post={posts[3]}/>}
        </Row>
        <div className="horiz"></div>
        <Row>
          {posts[4] && <OtherPost cssClass="other_post_col" post={posts[4]}/>}
        </Row>
        <div className="horiz"></div>
        <Row>
          {posts[5] && <OtherPost cssClass="other_post_col" post={posts[5]}/>}
        </Row>
      </Col>
    </Container>
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
  return <>{posts.length === 0 ? null : mainBlock}</>;
};

export default MainPagePosts;
