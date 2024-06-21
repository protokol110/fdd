import {Col, Row} from "react-bootstrap";
import PostFooter from "./PostFooter";
import {useNavigate} from "react-router-dom";

const OtherPost = ({post, cssClass}) => {
  const navigate = useNavigate();

  return (
    <div
      className={`${cssClass} other_post`}
      onClick={() => {
        navigate(`/posts/${post.id}`);
      }}
    >
      <Row className="other_post_block">
        <Col>
          <Row className="main_post_header_text other_post_header_text">
            {post.headline || "Заголовок новости"}
          </Row>
        </Col>
        <Col>
          <div className="post_header_short_text">{post.shortText}</div>
        </Col>
      </Row>

      <Row>
        <PostFooter datePublic={post.datePublic || "Дата публикации"}/>
      </Row>
    </div>
  );
};

export default OtherPost;
