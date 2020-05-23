import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import themesReducer from './store/reducers/themes';
import displayReducer from './store/reducers/display';
import operationsReducer from './store/reducers/operations';
import CalculatorScreen from './screens/CalculatorScreen';
import ThemesScreen from './screens/ThemesScreen';

const rootReducer = combineReducers({
  themes: themesReducer,
  display: displayReducer,
  operations: operationsReducer,
});

const store = createStore(rootReducer);

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Calculator') {
                iconName = focused ? 'ios-calculator' : 'ios-calculator';
              } else if (route.name === 'Themes') {
                iconName = focused ? 'ios-color-palette' : 'ios-color-palette';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#007aff',
            inactiveTintColor: '#8e8e93',
          }}
        >
          <Tab.Screen name="Calculator" component={CalculatorScreen} />
          <Tab.Screen name="Themes" component={ThemesScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
