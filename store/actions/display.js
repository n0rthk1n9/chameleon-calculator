export const SET_DISPLAY = 'SET_DISPLAY';
export const SET_CONCATENATE_DIGIT = 'SET_CONCATENATE_DIGIT';

export const setDisplay = (value) => {
  return { type: SET_DISPLAY, display: value };
};

export const setConcatenateDigit = (value) => {
  return { type: SET_CONCATENATE_DIGIT, concatenateDigit: value };
};
