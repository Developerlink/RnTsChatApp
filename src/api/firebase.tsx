import {Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

const signIn = (email: string, password: string) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      //onsole.log('User account signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        Alert.alert('', 'A user with that email does not exist.');
      } else if (error.code === 'auth/wrong-password') {
        Alert.alert('', 'That password is invalid.');
      } else {
        Alert.alert('', 'An undefined error happened.');
        console.log(error.message);
      }
    });
};

const signUp = (email: string, password: string) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      //console.log('User account created & signed in!');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('', 'That email address is already in use.');
      } else if (error.code === 'auth/invalid-email') {
        Alert.alert('', 'That email address is invalid.');
      } else if (error.code === 'auth/weak-password') {
        Alert.alert(
          '',
          'That password is too short. Should be at least 6 characters.',
        );
      } else if (error.code === 'auth/too-many-requests') {
        Alert.alert(
          '',
          'Access to this account has been temporarily disabled due to many failed login attempts. You can restore it by resetting your password or try again later.',
        );
      } else {
        Alert.alert('', 'An undefined error happened');
        console.log(error.message);
      }
    });
};

const signOut = () => {
  auth()
    .signOut()
    .then(() => {/*console.log('User signed out!')*/}
    )
    .catch(error => {
      console.log(error);
    });
};

export {signIn, signUp, signOut};
