import React, { Component } from 'react';
import { connect } from 'react-redux';
import { closeModal, joinNewsletter } from '../reducers/modal';
import _ from 'lodash';

class Modal extends Component {
  submitEmail () {
    this.props.joinNewsletter(this.textInput);
  }
  render () {
    if (!this.props.showModal) return null;
    return (
      <div>
        <span onClick={this.props.closeModal}>x</span>
        <input ref={(input) => { this.textInput = input; }} />
        <button onClick={this.submitEmail}>Submit</button>
        { this.props.subscriptionSuccess && <div>Success!</div> }
        { this.props.subscriptionFailure && <div>Please try again.</div> }
      </div>
    );
  }
}

export default connect(
  (state) => ({
    showModal: _.get(state, 'modal.showModal', false),
    subscriptionSuccess: _.get(state, 'modal.subscriptionSuccess', false),
    subscriptionFailure: _.get(state, 'modal.subscriptionFailure', false),
  }),
  (dispatch) => ({
    closeModal: () => {
      dispatch(closeModal());
    },
    joinNewsletter: () => {
      dispatch(joinNewsletter());
    }
  })
)(Modal);
