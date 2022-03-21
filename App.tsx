import React from 'react';
import {
  StatusBar,
  StyleSheet,
} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import { LogBox } from 'react-native';

import StackNavigator from './src/navigation/StackNavigator';
import {AuthContextProvider} from './src/store/authContext';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

enableScreens();

const App = () => {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <StatusBar barStyle={'light-content'} backgroundColor="black" />
        <StackNavigator />
      </NavigationContainer>
    </AuthContextProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
