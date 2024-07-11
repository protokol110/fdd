import {Link} from "react-router-dom";

const PostRow = ({post}) => {
  return (
    <div className="post_row">
      <div className="post_row_date">{post.datePublic}</div>
      <div className="post_row_body" style={{
        display: "-webkit-box",
        WebkitLineClamp: "2",
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }}>
        {post.headline}
        <span>   </span>
        <Link to={`/posts/${post.id}`} className="post_row_body_adv">
          подробнее
        </Link>
      </div>
    </div>
  );
};

export default PostRow;
