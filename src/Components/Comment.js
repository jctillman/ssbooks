import React from 'react';

export default ({comment}) => (
  <div>
    <div>{ comment.date }</div>
    <div>{ comment.author }</div>
    <div>{ comment.text }</div>
  </div>
);
