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
import auth from "@react-native-firebase/auth";

import colors from '../constants/colors';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  const { isLoggedIn, onLogIn, onLogOut} = useAuthContext();
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>();
  console.log(user);

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


  if (initializing) {
    return <SplashScreen />;
  }

  return (
    <RootStack.Navigator initialRouteName="Home"
    screenOptions={{
      headerRight: () => <Button title='Logout' onPress={() => onLogOut()} />
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
        <RootStack.Screen name="Login" component={LoginScreen}
        options={{headerRight: () => <></>}} />
      )}
    </RootStack.Navigator>
  );
}
