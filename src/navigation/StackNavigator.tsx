import React, {useEffect, useRef, useState} from 'react';
import {Platform, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {signOut} from '../api/firebaseAuth';
import {
  signOutFromFacebook,
  signInWithGoogleAsync,
  signOutFromGoogleAsync,
} from '../api/socialAuth';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';

import colors from '../constants/colors';
import {RootStackParamList, RootStackScreenProps} from './types';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import TestingScreen from '../screens/TestingScreen';
import {useAuthContext} from '../store/authContext';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  const {user, setUser, isLoading, setIsLoading} = useAuthContext();
  let isMounted = useRef(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, "ChatRoom">>();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      setUser(user);
      if (isLoading) {
        setIsLoading(false);
      }
    });


    return subscriber; // unsubscribe on unmount
  }, []);

  // useEffect(() => {
  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open

  //   messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //     navigation.navigate('ChatRoom', {roomId: 'Books'});
  //   });

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //         navigation.navigate('ChatRoom', {roomId: 'Books'});
  //       }
  //     });
  // }, []);

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
