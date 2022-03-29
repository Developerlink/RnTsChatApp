import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

GoogleSignin.configure({
  webClientId:
    '530816631694-ljusc5lqt6ijjmir9m55ht89umpdg3mp.apps.googleusercontent.com',
});

const signInWithGoogleAsync = async () => {
  try {
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const userSignIn = auth().signInWithCredential(googleCredential);

    userSignIn
      .catch(error => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

const signOutFromGoogleAsync = async () => {
  try {
    // await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  } catch (error) {
    console.log(error);
  }
};

const signInWithFacebookAsync = async () => {
  try {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );

    // Sign-in the user with the credential
    const userSignIn = auth().signInWithCredential(facebookCredential);

    userSignIn
      .catch(error => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

const signOutFromFacebook = async () => {
  LoginManager.logOut();
};

export {
  signInWithGoogleAsync,
  signInWithFacebookAsync,
  signOutFromGoogleAsync,
  signOutFromFacebook,
};
