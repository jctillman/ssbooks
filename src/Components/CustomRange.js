import moment from 'moment';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { unixToFormatted, formattedToUnix } from '../utils';
import { updateCustomRangeStartAction, updateCustomRangeEndAction } from '../reducers/customRange';
import _ from 'lodash';

class CustomRangeDatePickers extends Component {
  setCustomRangeStart (e) {
    const newStart = e.target.value;
    const newStartUnix = formattedToUnix(newStart);
    this.props.updateRangeStart(newStartUnix);
  }
  setCustomRangeEnd (e) {
    const newEnd = e.target.value;
    const newEndUnix = formattedToUnix(newEnd);
    this.props.updateRangeStart(newEndUnix);
  }
  render () {
    const { customStart, customEnd } = this.props;
    return (
      <div>
        <label for='customStart'>
          <input
            onChange={this.setCustomRangeStart}
            type='date'
            name='customStart'
            value={customStart}
          />
        </label>
        <label for='customEnd'>
          <input
            onChange={this.setCustomRangeEnd}
            type='date'
            name='customEnd'
            value={customEnd}
          />
        </label>
      </div>
    );
  }
}

export default connect (
  (state) => ({
    customStart: unixToFormatted(_.get(state, 'customRage.customStart')),
    customEnd: unixToFormatted(_.get(state, 'customRange.customEnd'))
  }),
  (dispatch) => ({
    updateRangeStart: (rangeStart) => {
      dispatch(updateCustomRangeStartAction(rangeStart));
    },
    updateRangeEnd: (rangeEnd) => {
      dispatch(updateCustomRangeEndAction(rangeEnd));
    }
  })
)(CustomRangeDatePickers);
