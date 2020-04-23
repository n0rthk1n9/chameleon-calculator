export const SET_ACTIVE_OPERATION = 'SET_ACTIVE_OPERATION';
export const SET_CHANGE_OPERATION = 'SET_CHANGE_OPERATION';

export const setActiveOperation = (selectedOperation) => {
  return {
    type: SET_ACTIVE_OPERATION,
    activeOperation: selectedOperation,
  };
};

export const setChangeOperation = (value) => {
  return {
    type: SET_CHANGE_OPERATION,
    changeOperation: value,
  };
};
