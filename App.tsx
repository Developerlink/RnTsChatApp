import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {enableScreens} from 'react-native-screens';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './src/navigation/StackNavigator';
import {AuthContextProvider} from './src/store/authContext';

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
