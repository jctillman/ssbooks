import React from 'react';
import CommentsContainer from './CommentsContainer';

export default class Book extends React.Component {
  constructor () {
    super();
    this.state = {
      expanded: false
    };
  }
  toggleComments () {
    this.setState({expanded: !this.state.expanded});
  }
  render () {
    const { title, author, imgSrc, comments } = this.props.book;
    const numComments = comments.length;
    return (
      <div>
        <img src={imgSrc} />
        <div>{title}</div>
        <div>{author}</div>
        <div>{`${numComments} comments`}</div>
        {
          this.state.expanded && <CommentsContainer comments={comments} />
        }
      </div>
    );
  }
}
