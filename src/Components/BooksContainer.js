import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Book from './Book';
import { requestMoreBooksAction } from '../reducers/books';

class BooksContainer extends Component {
  constructor () {
    super();
    this.infiniteScroll = _.debounce(this.infiniteScroll, 100);
  }
  infiniteScroll () {
    const amountScrolled = this.scrollTop;
    const totalHeight = this.scrollHeight;
    if (amountScrolled + 30 > totalHeight){ //If near bottom, fetch more books
      this.props.fetchMoreBooks();
      //Todo: check if we need to adjust scroll position to avoid choppiness
    }
  }
  render () {
    const { books, loading } = this.props;
    return (
      <div onScroll={this.infiniteScroll}>
        { !loading &&
          books.map((book, idx) => (
            <Book key={idx} book={book}/>
          ))
        }
        { loading &&
          <div>Loading</div>
        }
      </div>
    );
  }
}

export default connect(
  (state) => ({
    books: _.get(state, 'books', []),
    loading: _.get(state, 'loading', false)
  }),
  (dispatch) => ({
    fetchMoreBooks: () => {
      dispatch(requestMoreBooksAction());
    }
  })
)(BooksContainer);
