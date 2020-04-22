export const SET_SELECTED_THEME = 'SET_SELECTED_THEME';
export const SET_ADDITION_BUTTON_HIGHLIGHTED =
  'SET_ADDITION_BUTTON_HIGHLIGHTED';
export const SET_SUBTRACTION_BUTTON_HIGHLIGHTED =
  'SET_SUBTRACTION_BUTTON_HIGHLIGHTED';
export const SET_MULTIPLICATION_BUTTON_HIGHLIGHTED =
  'SET_MULTIPLICATION_BUTTON_HIGHLIGHTED';
export const SET_DIVISION_BUTTON_HIGHLIGHTED =
  'SET_DIVISION_BUTTON_HIGHLIGHTED';

export const setSelectedTheme = (selectedTheme) => {
  return { type: SET_SELECTED_THEME, selectedTheme: selectedTheme };
};

export const setAdditionButtonHighlighted = (value) => {
  return {
    type: SET_ADDITION_BUTTON_HIGHLIGHTED,
    additionButtonHighlighted: value,
  };
};

export const setSubtractionButtonHighlighted = (value) => {
  return {
    type: SET_SUBTRACTION_BUTTON_HIGHLIGHTED,
    subtractionButtonHighlighted: value,
  };
};

export const setMultiplicationButtonHighlighted = (value) => {
  return {
    type: SET_MULTIPLICATION_BUTTON_HIGHLIGHTED,
    multiplicationButtonHighlighted: value,
  };
};

export const setDivisionButtonHighlighted = (value) => {
  return {
    type: SET_DIVISION_BUTTON_HIGHLIGHTED,
    divisionButtonHighlighted: value,
  };
};
