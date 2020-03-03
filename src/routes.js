import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Home from './pages/Home';
import Cart from './pages/Cart';

import Header from './components/Header';

const Stack = createStackNavigator();

const screenOptions = {
  headerBackTitleVisible: false,
  cardStyle: {
    backgroundColor: '#111',
  },
  header: ({navigation}) => {
    return <Header navigation={navigation} />;
  },
};

function Routes() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  );
}

export default Routes;
