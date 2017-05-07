import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePresetRangeAction } from '../reducers/presetRange';
import BooksContainer from './BooksContainer';
import Nav from './Nav';
import Modal from './Modal';
import Filters from './Filters';
import { receiveBooksAction } from '../reducers/books';
import { mockBooks } from '../utils';
import Title from './title';

class App extends Component {
  componentDidMount (){
    //this.props.initialFetch();
    this.props.setMockBooksOnStore();
  }
  render () {
    return (
      <div className="appContainer">
        <Modal />
        <Nav />
        <Title />
        <Filters />
        <BooksContainer />
      </div>
    );
  }
}

export default connect(
  null,
  (dispatch) => ({
    initialFetch: () => {
      const defaultRange = 'week';
      dispatch(updatePresetRangeAction(defaultRange));
    },
    setMockBooksOnStore: () => {
      dispatch(receiveBooksAction(mockBooks));
    }
  })
)(App);
