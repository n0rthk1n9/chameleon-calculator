import { THEMES } from '../../constants/themes';
import { SET_SELECTED_THEME } from '../actions/themes';

const initialState = {
  selectedTheme: Object.keys(THEMES)[0],
};

const themesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_THEME:
      return { ...state, selectedTheme: action.selectedTheme };
    default:
      return state;
  }
  return state;
};

export default themesReducer;
