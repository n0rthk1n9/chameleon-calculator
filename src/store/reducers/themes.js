import { THEMES } from '../../config/themes';

const initialState = {
  selectedTheme: Object.keys(THEMES)[0],
};

const themesReducer = (state = initialState, action) => {
  return state;
};

export default themesReducer;
