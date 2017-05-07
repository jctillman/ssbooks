import axios from 'axios';
import _ from 'lodash';
import { responseLoadingAction, responseLoadedAction } from './loading';
import { createPresetRangeUrl, createCustomRangeUrl } from '../utils';

//Constants
const RECEIVE_BOOKS = 'RECEIVE_BOOKS'; //On initial load and filters change
const RECEIVE_MORE_BOOKS = 'RECEIVE_MORE_BOOKS'; //On infinite scroll
export const booksPerRequest = 30;

//Actions
export const receiveBooksAction = (books) => ({ //On initial load and filters change
  type: RECEIVE_BOOKS,
  payload: books //Todo: wherever arr of book items are on response obj
});

const receiveMoreBooksAction = (response) => ({
  type: RECEIVE_MORE_BOOKS,
  payload: response.data  //Todo: wherever arr of book items are on response obj
});

export const requestMoreBooksAction = () => (dispatch, getState) => { //On infinite scroll
  const state = getState();
  const books = _.get(state, 'books', []);
  const pagingStart = books.length;
  const pagingEnd = pagingStart + booksPerRequest;
  const presetRange = _.get(state, 'presetRange');
  const customRange = _.get(state, 'customRange');
  const searchString = _.get(state, 'search', '');
  const endpoint = presetRange === 'custom' ?
    createCustomRangeUrl(customRange, pagingStart, pagingEnd, searchString) :
    createPresetRangeUrl(presetRange, pagingStart, pagingEnd, searchString);
  const promiseForData = axios.get(endpoint);
  dispatch(responseLoadingAction());
  promiseForData.then(response => {
    dispatch(receiveMoreBooksAction(response));
    dispatch(responseLoadedAction());
  });
};

//Initial state
const initialState = [];

//Reducer
export const booksReducer = (state=initialState, action) => {
  switch (action.type) {
    case RECEIVE_BOOKS:
      return action.payload;
    case RECEIVE_MORE_BOOKS:
      return state.concat(action.payload);
    default:
      return state;
  }
};
