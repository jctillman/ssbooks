import axios from 'axios';
import _ from 'lodash';
import { responseLoadingAction, responseLoadedAction } from './loading';
import { receiveBooksAction } from './books';
import { booksPerRequest } from './books';
import { createCustomRangeUrl, createPresetRangeUrl } from '../utils';

//Constants
const UPDATE_SEARCH = 'UPDATE_SEARCH';

//Actions
const updateSearchActionSync = (search) => ({
  type: UPDATE_SEARCH,
  payload: search
});

export const updateSearchAction = (searchString) => (dispatch, getState) => {
  dispatch(updateSearchActionSync(searchString));
  const state = getState();
  const selectedRange = _.get(state, 'presetRange');
  const customRange = _.get(state, 'customRange');
  const pagingStart = 0;
  const pagingEnd = pagingStart + booksPerRequest;
  const endpoint = selectedRange === 'custom' ?
    createCustomRangeUrl(customRange, pagingStart, pagingEnd, searchString) :
    createPresetRangeUrl(selectedRange, pagingStart, pagingEnd, searchString);
  const promiseForData = axios.get(endpoint);
  dispatch(responseLoadingAction());
  promiseForData.then(response => {
    dispatch(receiveBooksAction(response));
    dispatch(responseLoadedAction());
  });
};

//Initial state
const initialState = '';

//Reducer
export const searchReducer = (state=initialState, action) => {
  switch (action.type) {
    case UPDATE_SEARCH:
      return action.payload;
    default:
      return state;
  }
};
