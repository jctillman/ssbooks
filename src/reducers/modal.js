//Constants
const SHOW_MODAL = 'SHOW_MODAL';
const HIDE_MODAL = 'HIDE_MODAL';
const JOIN_NEWSLETTER_SUCCESS = 'JOIN_NEWSLETTER_SUCCESS';
const JOIN_NEWSLETTER_FAILURE = 'JOIN_NEWSLETTER_FAILURE';

//Actions
export const showModal = ({
  type: SHOW_MODAL
});

export const hideModal = ({
  type: HIDE_MODAL
});

export const joinNewsletter = (email) => (dispatch) => {
  //Todo: Mailchimp endpoint
    //On success, show success message
    //On failure, show failure message
};

export const joinNewsletterSuccess = () => ({
  type: JOIN_NEWSLETTER_SUCCESS
});

export const joinNewsletterFailure = () => ({
  type: JOIN_NEWSLETTER_FAILURE
});

//Initial state
const initialState = {
  showModal: false,
  subscriptionSuccess: false,
  subscriptionFailure: false
};

//Reducer
export const modalReducer = (state=initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return {
        showModal: true,
        subscriptionSuccess: false,
        subscriptionFailure: false
      };
    case HIDE_MODAL:
      return {
        showModal: false,
        subscriptionSuccess: false,
        subscriptionFailure: false
      };
    case JOIN_NEWSLETTER_SUCCESS:
      return {
        showModal: state.showModal,
        subscriptionSuccess: true,
        subscriptionFailure: false
      };
    case JOIN_NEWSLETTER_FAILURE:
      return {
        showModal: state.showModal,
        subscriptionSuccess: false,
        subscriptionFailure: true
      };
    default:
      return state;
  }
};
