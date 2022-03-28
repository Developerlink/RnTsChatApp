import React, {useEffect, useState} from 'react';
import {Platform, Button} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {signOut} from '../api/firebaseAuth';
import {
  signOutFromFacebook,
  signInWithGoogleAsync,
  signOutFromGoogleAsync,
} from '../api/socialAuth';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';

import colors from '../constants/colors';
import {RootStackParamList} from './types';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import TestingScreen from '../screens/TestingScreen';
import LoadingScreen from '../screens/LoadingScreen';
import {useAuthContext} from '../store/authContext';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  const {user, setUser, isLoading, setIsLoading} = useAuthContext();
  //console.log(user);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setUser(user);
      if (isLoading) {
        setIsLoading(false);
      }
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (!isLoading) {
      SplashScreen.hide();
    }

    return () => {};
  }, [isLoading]);

  return (
    <RootStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerRight: () => (
          <Button
            title="Logout"
            onPress={() => {
              signOut();
              signOutFromGoogleAsync();
              signOutFromFacebook();
            }}
            color={colors.primary}
          />
        ),
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
