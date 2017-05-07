//Constants
const RESPONSE_LOADED = 'UPDATE_RESPONSE_RECEIVED';
const RESPONSE_LOADING = 'UPDATE_RESPONSE_LOADING';

//Actions
export const responseLoadingAction = () => ({
  type: RESPONSE_LOADING,
});

export const responseLoadedAction = () => ({
  type: RESPONSE_LOADED,
});

//Initial state
const initialState = false;

//Reducer
export const loadingReducer = (state=initialState, action) => {
  switch (action.type) {
    case RESPONSE_LOADED:
      return false;
    case RESPONSE_LOADING:
      return true;
    default:
      return state;
  }
};
