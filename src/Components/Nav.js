import React, { Component } from 'react';
import { connect } from 'react-redux';
import { showModal } from '../reducers/modal';

class Nav extends Component {
  render () {
    return (
      <div className="nav">
        <div onClick={this.props.showModal} className="newsletter">
          Newsletter
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  (dispatch) => ({
    showModal: () => {
      dispatch(showModal);
    }
  })
)(Nav);
