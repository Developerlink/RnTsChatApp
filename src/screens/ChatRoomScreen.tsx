import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import {RootStackScreenProps} from '../navigation/types';
import colors from '../constants/colors';
import {TextInput, TouchableWithoutFeedback} from 'react-native-gesture-handler';

export default function ChatRoomScreen({
  navigation,
  route,
}: RootStackScreenProps<'ChatRoom'>) {
  const db = firestore();

  const fetchMessages = () => {
    db.collection('chatrooms')
      .doc('Food')
      .collection('messages')
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
      });
  };

  useEffect(() => {
    const {roomId} = route.params;

    navigation.setOptions({title: roomId + ' Chat'});
  }, []);

  // style komponents and layout
  // TODO: last 50 messages
  // TODO: scroll to load more
  // TODO: realtime message updates
  // TODO: avatar, name, date, text

  return (
    <View style={styles.screen}>
        <View style={styles.messageContainer}>
          <Text>test</Text>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <TextInput placeholder="Type a message..." />
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity>
              <View style={styles.iconButton}>
                <Icon name="photo" size={30} color={colors.primary} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.iconButton}>
                <Icon name="camera-retro" size={30} color={colors.primary} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1},
  messageContainer: {
    flex: 1,
    borderBottomColor: colors.primaryDark,
    borderBottomWidth: 2,
  },
  inputContainer: {},
  input: {},
  buttonsContainer: {flexDirection: 'row', paddingVertical: 5},
  iconButton: {marginHorizontal: 5},
});
