import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updatePresetRangeAction } from '../reducers/presetRange';
import CustomRange from './CustomRange';
import _ from 'lodash';
import { rangeOptions } from '../utils';

class Range extends Component {
  constructor (){
    super();
    this.setSelectedRange = this.setSelectedRange.bind(this);
  }
  setSelectedRange (e) {
    const selected = e.target.value;
    this.props.updateRangeAction(selected);
  }
  render () {
    const { selectedRange } = this.props;
    return (
      <div>
      <select value={selectedRange} onChange={this.setSelectedRange}>
        {
          rangeOptions.map((option, idx) => (
            <option key={idx} value={option.value}>{option.displayText}</option>
          ))
        }
      </select>
      {
        selectedRange === 'custom' && <CustomRange/>
      }
      </div>
    );
  }
}

export default (connect(
  (state) => ({
    selectedRange: _.get(state, 'presetRange')
  }),
  (dispatch) => ({
    updateRangeAction: (range) => {
      dispatch(updatePresetRangeAction(range));
    }
  })
))(Range);
