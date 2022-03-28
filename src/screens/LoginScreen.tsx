import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Icon from 'react-native-vector-icons/FontAwesome';

import {signUp, signIn} from '../api/firebaseAuth';
import {
  signInWithGoogleAsync,
  signInWithFacebookAsync,
} from '../api/socialAuth';
import {RootStackScreenProps} from '../navigation/types';
import {useAuthContext} from '../store/authContext';
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
            <Button
              title={isSigningIn ? 'Sign in' : 'Sign up'}
              color={colors.primary}
              onPress={handleSubmit(onSubmit, onError)}
            />
          </View>
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              {isSigningIn
                ? "Don't have an account?"
                : 'Already have an account?'}
            </Text>
            <TouchableOpacity
              onPress={() => setIsSigningIn(prevState => !prevState)}
              activeOpacity={0.7}>
              <Text style={styles.questionButton}>
                {isSigningIn ? 'Sign Up' : 'Sign In'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.button}>
          <Icon.Button
            name="facebook"
            backgroundColor="#3b5998"
            onPress={signInWithFacebookAsync}
            size={24}
            borderRadius={3}>
            <Text
              style={{color: 'white', fontWeight: '500', textAlign: 'center'}}>
              Sign in with Facebook
            </Text>
          </Icon.Button>
        </View>
        <View style={styles.button}>
          <Icon.Button
            name="google"
            backgroundColor="darkred"
            onPress={signInWithGoogleAsync}
            size={24}
            borderRadius={3}>
            <Text
              style={{color: 'white', fontWeight: '500', textAlign: 'center'}}>
              Sign in with Google
            </Text>
          </Icon.Button>
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
  questionContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  questionText: {
    fontWeight: '700',
  },
  questionButton: {
    marginLeft: 10,
    fontWeight: '700',
    color: colors.primary,
  },
  button: {
    marginBottom: 10,
    width: '60%',
  },
  error: {
    color: 'red',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
