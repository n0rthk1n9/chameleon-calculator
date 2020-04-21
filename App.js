import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import themesReducer from './store/reducers/themes';
import CalculatorScreen from './screens/CalculatorScreen';

const rootReducer = combineReducers({
  themes: themesReducer,
});

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <CalculatorScreen />
    </Provider>
  );
};

export default App;
