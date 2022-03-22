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
import ChatInputContainer from '../components/ChatInputContainer';
import colors from '../constants/colors';

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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.inner}>
        <View style={styles.messageContainer}>
          <Text>test</Text>
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
});
