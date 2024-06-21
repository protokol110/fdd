const PostFooter = ({datePublic}) => {
  return (
    <div className="post_footer_block">
      <span className="post_footer_block_text">Подробнее</span>
      <span className="post_footer_block_date">{datePublic}</span>
    </div>
  );
};

export default PostFooter;
