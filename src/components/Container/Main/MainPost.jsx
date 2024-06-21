import {Col, Container, Image, Row} from "react-bootstrap";
import PostFooter from "./PostFooter";
import {useNavigate} from "react-router-dom";

const MainPost = ({post}) => {
  const navigate = useNavigate();

  return (
    <Container
      fluid
      className="main_post"
      onClick={() => {
        navigate(`/posts/${post.id}`);
      }}
    >
      <Row>
        <Col>
          <Row>
            <Image
              className="main_post_header_image"
              src={`data:image/jpeg;base64,${post.mainIcon}`}
            />
          </Row>

          <Row className="main_post_header_text">
            {post.headline || "Заголовок новости"}
          </Row>
        </Col>
        <Col>
          <div className="post_header_short_text main_post_header_short_text">
            {post.shortText || ""}
          </div>
        </Col>
      </Row>

      <Row>
        <PostFooter datePublic={post.datePublic || "Дата публикации"}/>
      </Row>
    </Container>
  );
};

export default MainPost;
