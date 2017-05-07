import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateSearchAction } from '../reducers/search';
import _ from 'lodash';


class Search extends Component {
  submitSearch (e) {
    const searchString = e.target.value;
    this.props.updateSearchAction(searchString);
  }
  render () {
    const { searchString } = this.props;
    return (
      <div>
        <input
          type='search'
          value={searchString}
          onChange={_.debounce(this.submitSearch, 250)}
          placeholder="Search by title"
        />
      </div>
    );
  }
}

export default (connect(
  (state) => ({
    searchString: _.get(state, 'search')
  }),
  (dispatch) => ({
    updateSearchAction: (searchString) => {
      dispatch(updateSearchAction(searchString));
    }
  })
))(Search);
