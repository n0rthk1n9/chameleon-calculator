import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import themesReducer from './store/reducers/themes';
import displayReducer from './store/reducers/display';
import operationsReducer from './store/reducers/operations';
import CalculatorScreen from './screens/CalculatorScreen';

const rootReducer = combineReducers({
  themes: themesReducer,
  display: displayReducer,
  operations: operationsReducer,
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
