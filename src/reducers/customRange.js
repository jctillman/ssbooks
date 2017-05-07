import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import { responseLoadingAction, responseLoadedAction } from './loading';
import { receiveBooksAction } from './books';
import { booksPerRequest } from './books';
import { createCustomRangeUrl } from '../utils';

//Constants
const UPDATE_CUSTOM_RANGE_START = 'UPDATE_CUSTOM_RANGE_START';
const UPDATE_CUSTOM_RANGE_END = 'UPDATE_CUSTOM_RANGE_END';

//Actions
const updateCustomRangeStartActionSync = (rangeStart) => ({
  type: UPDATE_CUSTOM_RANGE_START,
  payload: rangeStart
});

const updateCustomRangeEndActionSync = (rangeEnd) => ({
  type: UPDATE_CUSTOM_RANGE_END,
  payload: rangeEnd
});

export const updateCustomRangeStartAction = (rangeStart) => (dispatch, getState) => {
  dispatch(updateCustomRangeStartActionSync(rangeStart));
  const state = getState();
  const searchString = _.get(state, 'search');
  const pagingStart = 0;
  const pagingEnd = pagingStart + booksPerRequest;
  const customEnd = _.get(state, 'customRange.customEnd');
  const endpoint = createCustomRangeUrl({customStart: rangeStart, customEnd: customEnd}, pagingStart, pagingEnd, searchString)
  const promiseForData = axios.get(endpoint);
  dispatch(responseLoadingAction());
  promiseForData.then(response => {
    dispatch(receiveBooksAction(response));
    dispatch(responseLoadedAction());
  });
};

export const updateCustomRangeEndAction = (rangeEnd) => (dispatch, getState) => {
  dispatch(updateCustomRangeEndActionSync(rangeEnd));
  const state = getState();
  const searchString = _.get(state, 'search');
  const pagingStart = 0;
  const pagingEnd = pagingStart + booksPerRequest;
  const customStart = _.get(state, 'customRange.customStart');
  const endpoint = createCustomRangeUrl({customStart: customStart, customEnd: rangeEnd}, pagingStart, pagingEnd, searchString)
  const promiseForData = axios.get(endpoint);
  dispatch(responseLoadingAction());
  promiseForData.then(response => {
    dispatch(receiveBooksAction(response));
    dispatch(responseLoadedAction());
  });
};

//Initial state
const initialState = {
  customStart: moment(),
  customEnd: moment().subtract(1, 'months')
};

//Reducer
export const customRangeReducer = (state=initialState, action) => {
  switch (action.type) {
    case UPDATE_CUSTOM_RANGE_START:
      return {
        customStart: action.payload,
        customEnd: state.customEnd
      };
    case UPDATE_CUSTOM_RANGE_END:
      return {
        customStart: state.customStart,
        customEnd: action.payload
      };
    default:
      return state;
  }
};
