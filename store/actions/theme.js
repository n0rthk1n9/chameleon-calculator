export const SET_SELECTED_THEME = 'SET_SELECTED_THEME';

export const setSelectedTheme = (selectedTheme) => {
  return { type: SET_SELECTED_THEME, selectedTheme: selectedTheme };
};
