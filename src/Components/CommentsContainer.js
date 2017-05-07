import Comment from './Comment';

export default ({comments}) => (
  <div>
    {
      comments.map(
        (comment, idx) => (
          <Comment key={idx} comment={comment} />
        )
      )
    }
  </div>
);
