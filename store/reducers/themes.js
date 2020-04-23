import { THEMES } from '../../constants/themes';
import {
  SET_SELECTED_THEME,
  SET_ADDITION_BUTTON_HIGHLIGHTED,
  SET_SUBTRACTION_BUTTON_HIGHLIGHTED,
  SET_MULTIPLICATION_BUTTON_HIGHLIGHTED,
  SET_DIVISION_BUTTON_HIGHLIGHTED,
  SET_SHOW_EXPLOSION,
} from '../actions/themes';

const initialState = {
  selectedTheme: Object.keys(THEMES)[0],
  additionButtonHighlighted: false,
  subtractionButtonHighlighted: false,
  multiplicationButtonHighlighted: false,
  divisionButtonHighlighted: false,
  showExplosion: false,
};

const themesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_THEME:
      return { ...state, selectedTheme: action.selectedTheme };
    case SET_ADDITION_BUTTON_HIGHLIGHTED:
      return {
        ...state,
        additionButtonHighlighted: action.additionButtonHighlighted,
      };
    case SET_SUBTRACTION_BUTTON_HIGHLIGHTED:
      return {
        ...state,
        subtractionButtonHighlighted: action.subtractionButtonHighlighted,
      };
    case SET_MULTIPLICATION_BUTTON_HIGHLIGHTED:
      return {
        ...state,
        multiplicationButtonHighlighted: action.multiplicationButtonHighlighted,
      };
    case SET_DIVISION_BUTTON_HIGHLIGHTED:
      return {
        ...state,
        divisionButtonHighlighted: action.divisionButtonHighlighted,
      };
    case SET_SHOW_EXPLOSION:
      return { ...state, showExplosion: action.showExplosion };
    default:
      return state;
  }
  return state;
};

export default themesReducer;
