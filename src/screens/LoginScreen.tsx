import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {RootStackScreenProps} from '../navigation/types';
import {useAuthContext} from '../store/authContext';

import colors from '../constants/colors';

export default function LoginScreen({
  navigation,
  route,
}: RootStackScreenProps<'Login'>) {
  const {onLogIn} = useAuthContext();

  return (
    <View style={styles.screen}>
      <View style={styles.button}>
        <Button
          title="Facebook Login"
          onPress={() => onLogIn('test', 'test')}
        />
      </View>
      <View style={styles.button}>
        <Button title="Google Login" onPress={() => onLogIn('test', 'test')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginBottom: 10,
  },
});
