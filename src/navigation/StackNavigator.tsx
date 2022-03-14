import React, {useEffect} from 'react';
import {Platform, Button} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import TestingScreen from '../screens/TestingScreen';
import LoadingScreen from '../screens/LoadingScreen';
import {useAuthContext} from '../store/authContext';

import colors from '../constants/colors';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  const {isLoading, isLoggedIn, onLogIn, onLogOut} = useAuthContext();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <RootStack.Navigator initialRouteName="Home"
    screenOptions={{
      headerRight: () => <Button title='Logout' onPress={() => onLogOut()} />
    }}>
      {isLoggedIn === true ? (
        <>
          <RootStack.Screen name="Home" component={HomeScreen} />
          <RootStack.Screen
            name="ChatRoom"
            component={ChatRoomScreen}
            options={{title: 'Chat Room'}}
          />
          <RootStack.Screen name="Testing" component={TestingScreen} />
        </>
      ) : (
        <RootStack.Screen name="Login" component={LoginScreen}
        options={{headerRight: () => <></>}} />
      )}
    </RootStack.Navigator>
  );
}
