import React, {useEffect, useRef} from 'react';
import {Platform, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';

import colors from '../constants/colors';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import {RootStackParamList} from './types';
import {useAuthContext} from '../store/authContext';
import {signOut} from '../api/firebaseAuth';
import {signOutFromFacebook, signOutFromGoogleAsync} from '../api/socialAuth';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  const {user, setUser, isLoading, setIsLoading} = useAuthContext();
  let isMounted = useRef(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'ChatRoom'>>();

  // Check if user is already logged in
  useEffect(() => {
    isMounted.current = true;
    try {
      auth().onAuthStateChanged(user => {
        if (isMounted.current) {
          setUser(user);
        }
      });
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);

    return () => {
      (() => {
        isMounted.current = false;
      })();
    };
  }, []);

  // Hide splash screen when finished loading
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
