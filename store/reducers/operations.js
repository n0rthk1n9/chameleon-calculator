import {
  SET_ACTIVE_OPERATION,
  SET_CHANGE_OPERATION,
} from '../actions/operations';

const initialState = {
  activeOperation: '',
  changeOperation: true,
};

const operationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_OPERATION:
      return { ...state, activeOperation: action.activeOperation };
    case SET_CHANGE_OPERATION:
      return { ...state, changeOperation: action.changeOperation };
    default:
      return state;
  }
  return state;
};

export default operationsReducer;
