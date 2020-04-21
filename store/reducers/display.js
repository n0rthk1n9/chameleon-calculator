import { SET_DISPLAY, SET_CONCATENATE_DIGIT } from '../actions/display';

const initialState = {
  display: '0',
  concatenateDigit: false,
};

const displayReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DISPLAY:
      return { ...state, display: action.display };
    case SET_CONCATENATE_DIGIT:
      return { ...state, concatenateDigit: action.concatenateDigit };
    default:
      return state;
  }
  return state;
};

export default displayReducer;
