import React, {useEffect, useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import {RootStackScreenProps} from '../navigation/types';

import colors from '../constants/colors';

export default function ChatRoomScreen({
  navigation,
  route,
}: RootStackScreenProps<'ChatRoom'>) {
  const db = firestore();
  const [message, setMessage] = useState('');

  const fetchMessages = () => {
    db.collection('chatrooms')
      .doc('Food')
      .collection('messages')
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
      });
  };

  const sendMessageHandler = () => {
    console.log(message);
    setMessage("");
    Keyboard.dismiss();
  }

  useEffect(() => {
    const {roomId} = route.params;
    navigation.setOptions({title: roomId + ' Chat'});
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.inner}>
        <View style={styles.messageContainer}>
          <Text>test</Text>
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <View>
              <FontAwesome name="photo" size={30} color={colors.primary} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <View>
              <FontAwesome
                name="camera-retro"
                size={30}
                color={colors.primary}
              />
            </View>
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            multiline={true}
            numberOfLines={1}
            value={message}
            onChangeText={newValue => setMessage(newValue)}
          />
          <TouchableOpacity
            style={styles.iconButton}
            onPress={sendMessageHandler}>
            <View>
              <Ionicon name="send" size={30} color={colors.primary} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
  },
  messageContainer: {
    flex: 1,
    borderBottomColor: colors.primaryDark,
    borderBottomWidth: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    marginRight: 5,
  },
  iconButton: {
    marginHorizontal: 5,
  },
});
