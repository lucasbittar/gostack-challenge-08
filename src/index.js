import 'react-native-gesture-handler';
import React from 'react';
import {Provider} from 'react-redux';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import './config/ReactotronConfig';

import store from './store';

import Routes from './routes';
import Navigation from './services/navigation';

// navigatorRef => Navigation.setNavigator(navigatorRef)
const myRef = ref => {
  console.tron.log('REF');
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle="light-content" />
        <Routes ref={ref => myRef(ref)} />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
