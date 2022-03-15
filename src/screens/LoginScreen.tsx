import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Dimensions,
} from 'react-native';
import {RootStackScreenProps} from '../navigation/types';
import {useAuthContext} from '../store/authContext';

import colors from '../constants/colors';

export default function LoginScreen({
  navigation,
  route,
}: RootStackScreenProps<'Login'>) {
  const [isSigningIn, setIsSigningIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {onLogIn} = useAuthContext();

  // sign up functionality
  // sign in functionality
  // update context

  return (
    <View style={styles.screen}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(value: string) => {}}
        />
        <Text style={styles.label}>Email</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} secureTextEntry />
        <Text style={styles.label}>Password</Text>
      </View>
      <View style={styles.upperButtonContainer}>
        <View style={styles.upperButton}>
          {isSigningIn ? (
            <Button title="Sign In" color={colors.primary} />
          ) : (
            <Button title="Sign Up" color={colors.primary} />
          )}
        </View>
        <View style={styles.upperButton}>
          <Button
            title={
              isSigningIn
                ? "Don't have an account?"
                : 'Already have an account?'
            }
            color={colors.primaryDark}
            onPress={() => setIsSigningIn(prevState => !prevState)}
          />
        </View>
      </View>

      <View style={styles.button}>
        <Button
          title="Sign in with Facebook"
          color={'royalblue'}
          onPress={() => onLogIn('test', 'test')}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Sign in with Google"
          color={'darkred'}
          onPress={() => onLogIn('test', 'test')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    minWidth: '50%',
    fontSize: 20,
    marginBottom: 5,
  },
  label: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
  upperButtonContainer: {
    marginBottom: 60,
  },
  upperButton: {
    marginBottom: 10,
    width: Dimensions.get('window').width * 0.6,
  },
  button: {
    marginBottom: 10,
    width: '60%',
  },
});
