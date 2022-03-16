import React, {useState, useRef, LegacyRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Dimensions,
  Alert,
  ScrollView,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {RootStackScreenProps} from '../navigation/types';
import {useAuthContext} from '../store/authContext';
import {signUp, signIn} from '../api/firebase';

import colors from '../constants/colors';

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function LoginScreen({
  navigation,
  route,
}: RootStackScreenProps<'Login'>) {
  const [isSigningIn, setIsSigningIn] = useState(true);
  const {onLogIn} = useAuthContext();
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const emailInputRef = useRef<TextInput | null>(null);
  const passwordInputRef = useRef<TextInput | null>(null);

  const onSubmit = (data: any) => {
    const email: string = data.email;
    const password: string = data.password;

    if (isSigningIn) {
      signIn(email, password);
    } else {
      signUp(email, password);
    }
  };

  const onError = (errors: any) => {
    const error = Object.keys(errors)[0];

    if (error === 'email') {
      emailInputRef?.current?.focus();
    } else if (error === 'password') {
      passwordInputRef?.current?.focus();
    }
  };

  // sign up functionality
  // sign in functionality
  // update context

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.screen}>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="email"
            rules={{required: true}}
            defaultValue=""
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={value => onChange(value)}
                onBlur={onBlur}
                returnKeyType="next"
                ref={emailInputRef}
              />
            )}
          />
          {errors['email'] && (
            <Text style={styles.error}>{errors['email'].message}</Text>
          )}
          {/* <TextInput
          style={styles.input}
          value={email}
          onChangeText={(value: string) => {}}
        /> */}
          <Text style={styles.label}>Email</Text>
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name="password"
            rules={{required: true}}
            defaultValue=""
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={value => onChange(value)}
                onBlur={onBlur}
                returnKeyType="done"
                secureTextEntry
                ref={passwordInputRef}
              />
            )}
          />
          {errors['password'] && (
            <Text style={styles.error}>{errors['password'].message}</Text>
          )}
          {/* <TextInput style={styles.input} secureTextEntry /> */}
          <Text style={styles.label}>Password</Text>
        </View>
        <View style={styles.upperButtonContainer}>
          <View style={styles.upperButton}>
            {isSigningIn ? (
              <Button
                title="Sign In"
                color={colors.primary}
                onPress={handleSubmit(onSubmit, onError)}
              />
            ) : (
              <Button
                title="Sign Up"
                color={colors.primary}
                onPress={handleSubmit(onSubmit, onError)}
              />
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
            onPress={() => {}}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Sign in with Google"
            color={'darkred'}
            onPress={() => {}}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flexGrow: 1, paddingVertical: 20, backgroundColor: 'white'},
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
  error: {
    color: 'red',
  },
});
