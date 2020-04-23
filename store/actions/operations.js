export const SET_ACTIVE_OPERATION = 'SET_ACTIVE_OPERATION';

export const setActiveOperation = (selectedOperation) => {
  return {
    type: SET_ACTIVE_OPERATION,
    activeOperation: selectedOperation,
  };
};
