import { combineReducers } from 'redux';
import axios from 'axios';
import { booksReducer } from './books';
import { loadingReducer } from './loading';
import { modalReducer } from './modal';
import { searchReducer } from './search';
import { presetRangeReducer } from './presetRange';
import { customRangeReducer } from './customRange';

const rootReducer = combineReducers({
  books: booksReducer,
  loading: loadingReducer,
  modal: modalReducer,
  search: searchReducer,
  presetRange: presetRangeReducer,
  customRange: customRangeReducer
});

export default rootReducer;
