import React, {useEffect, useState} from 'react';
import {Platform, Button} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import TestingScreen from '../screens/TestingScreen';
import SplashScreen from '../screens/SplashScreen';
import {useAuthContext} from '../store/authContext';
import {signOut} from '../api/firebase';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {User} from '../models/user';

import colors from '../constants/colors';
import {SimultaneousGesture} from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gestureComposition';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  const {user, setUser, isLoading, setIsLoading} = useAuthContext();
  console.log(user);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setUser(user);
      if (isLoading) {
        setIsLoading(false);
      }
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <RootStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerRight: () => <Button title="Logout" onPress={signOut} />,
        headerStyle: {
          backgroundColor:
            Platform.OS === 'android' ? colors.primaryDark : 'white',
        },
        headerTintColor:
          Platform.OS === 'android' ? 'white' : colors.primaryDark,
      }}>
      {user ? (
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
        <RootStack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerRight: () => <></>}}
        />
      )}
    </RootStack.Navigator>
  );
}
