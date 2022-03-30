import React from 'react';
import {
  StatusBar,
  StyleSheet,
} from 'react-native';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import { LogBox } from 'react-native';

// Own imports
import colors from "./src/constants/colors";
import StackNavigator from './src/navigation/StackNavigator';
import {AuthContextProvider} from './src/store/authContext';

LogBox.ignoreLogs(['new NativeEventEmitter']);

enableScreens();

const App = () => {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <StatusBar barStyle={'light-content'} backgroundColor={colors.primaryDark} />
        <StackNavigator />
      </NavigationContainer>
    </AuthContextProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
