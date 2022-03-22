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
  Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

import {RootStackScreenProps} from '../navigation/types';
import ChatInputContainer from '../components/ChatInputContainer';
import Card from '../components/Card';
import ChatBubble from '../components/ChatBubble';
import colors from '../constants/colors';
import { Message } from '../models/message';

export default function ChatRoomScreen({
  navigation,
  route,
}: RootStackScreenProps<'ChatRoom'>) {
  const db = firestore();
  const [newMessage, setNewMessage] = useState('');

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
    console.log(newMessage);
    setNewMessage('');
    Keyboard.dismiss();
  };

  useEffect(() => {
    const {roomId} = route.params;
    navigation.setOptions({title: roomId + ' Chat'});
  }, []);

  const message1: Message = {
    id: "fkdjasæfj",
    displayedName: "Thomas Paine",
    text: "Hi, how have you been? It's been so long since we have talked. Don't be a stranger!",
    imageUrl: 'https://reactnative.dev/img/tiny_logo.png',
    createdAt: "4/4/2022 15:00:15"
  }

  const message2: Message = {
    id: "fkdjefawe",
    displayedName: "Immanuel Kant",
    text: "Hey there, been a little busy. What about you? I heard you got married? What's that all about?",
    imageUrl: 'https://reactnative.dev/img/tiny_logo.png',
    createdAt: "4/4/2022 15:04:32"
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.messageContainer}>
            <ChatBubble 
              message={message1}
            />
            <ChatBubble message={message2} putAvatarOnLeft={false} />

          </View>
          <ChatInputContainer
            value={newMessage}
            onChangeText={setNewMessage}
            onSend={sendMessageHandler}
            onCamera={() => {}}
            onPhotos={() => {}}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
  },
  messageContainer: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderBottomColor: colors.primaryDark,
    borderBottomWidth: 2,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 35,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  messageBubble: {flexDirection: 'row', marginBottom: 10},
  ownMessageBubble: {
    alignSelf: 'flex-end',
  },
  message: {
    width: '65%',
  },
  nameDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 5
  },
  ownMessageColor: {
    backgroundColor: '#efe',
  },
});
