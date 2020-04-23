import {
  SET_ACTIVE_OPERATION,
  SET_CHANGE_OPERATION,
  SET_RESULT_GENERATED,
} from '../actions/operations';

const initialState = {
  activeOperation: '',
  changeOperation: true,
  resultGenerated: false,
};

const operationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTIVE_OPERATION:
      return { ...state, activeOperation: action.activeOperation };
    case SET_CHANGE_OPERATION:
      return { ...state, changeOperation: action.changeOperation };
    case SET_RESULT_GENERATED:
      return { ...state, resultGenerated: action.resultGenerated };
    default:
      return state;
  }
  return state;
};

export default operationsReducer;
