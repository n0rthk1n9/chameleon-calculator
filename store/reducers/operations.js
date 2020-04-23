import { SET_ACTIVE_OPERATION } from '../actions/operations';

const initialState = {
  activeOperation: '',
};

const operationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_OPERATION:
      return { ...state, activeOperation: action.activeOperation };
    default:
      return state;
  }
  return state;
};

export default operationsReducer;
