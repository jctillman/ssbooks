import axios from 'axios';
import _ from 'lodash';
import { responseLoadingAction, responseLoadedAction } from './loading';
import { receiveBooksAction } from './books';
import { booksPerRequest } from './books';
import { createCustomRangeUrl, createPresetRangeUrl } from '../utils';

//Constants
const UPDATE_PRESET_RANGE = 'UPDATE_PRESET_RANGE';

//Actions
const updatePresetRangeActionSync = (range) => ({
  type: UPDATE_PRESET_RANGE,
  payload: range
});

export const updatePresetRangeAction = (range) => (dispatch, getState) => {
  dispatch(updatePresetRangeActionSync(range));
  const state = getState();
  const searchString = _.get(state, 'search', '');
  const pagingStart = 0;
  const pagingEnd = pagingStart + booksPerRequest;
  const customRange = _.get(state, 'customRange');
  const endpoint = range === 'custom' ?
   createCustomRangeUrl(customRange, pagingStart, pagingEnd, searchString) :
   createPresetRangeUrl(range, pagingStart, pagingEnd, searchString);
  const promiseForData = axios.get(endpoint);
  dispatch(responseLoadingAction());
  promiseForData.then(response => {
    dispatch(receiveBooksAction(response));
    dispatch(responseLoadedAction());
  });
};

//Initial state
const initialState = 'week'; // 'week', 'month', 'all', 'custom'

//Reducer
export const presetRangeReducer = (state=initialState, action) => {
  switch (action.type) {
    case UPDATE_PRESET_RANGE:
      return action.payload;
    default:
      return state;
  }
};
