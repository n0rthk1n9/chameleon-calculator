import { SET_DISPLAY } from '../actions/display';

const initialState = {
  display: '0',
};

const displayReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DISPLAY:
      return { ...state, display: action.display };
    default:
      return state;
  }
  return state;
};

export default displayReducer;
