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
  FlatList,
  ListRenderItemInfo,
  ActivityIndicator,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import colors from '../constants/colors';
import {RootStackScreenProps} from '../navigation/types';
import ChatInputContainer from '../components/ChatInputContainer';
import ChatMessageContainer from '../components/ChatMessageContainer';
import {Message, SendMessage} from '../models/message';
import {useAuthContext} from '../store/authContext';

const MESSAGE_NUMBER_INCREMENT = 50;

export default function ChatRoomScreen({
  navigation,
  route,
}: RootStackScreenProps<'ChatRoom'>) {
  const [newText, setNewText] = useState('');
  const [messages, setMessages] = useState<Message[] | null>(null);
  const {user} = useAuthContext();
  const [roomId, setRoomId] = useState('');
  const [messageLimit, setMessageLimit] = useState(50);

  useEffect(() => {
    const {roomId} = route.params;
    navigation.setOptions({title: roomId + ' Chat'});
    setRoomId(roomId);
    // console.log(roomId);
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection('chatrooms')
      .doc(roomId)
      .collection('messages')
      .limit(messageLimit)
      .orderBy('createdAt', 'desc')
      .onSnapshot({includeMetadataChanges: true}, querySnapshot => {
        if (querySnapshot.metadata.hasPendingWrites) {
          return; // ignore cache snapshots where new data is being written
        }

        const fetchedMessages = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
            createdAt: doc
              .data()
              .createdAt.toDate()
              .toISOString()
              .slice(2, 16)
              .replace(/-/g, '/')
              .replace('T', ' '),
          } as Message;
        });
        setMessages(fetchedMessages);
      });

    return () => subscriber();
  }, [roomId, messageLimit]);

  const sendMessageHandler = () => {
    if (user && newText.length > 0) {
      const timeStamp = firestore.FieldValue.serverTimestamp();

      const messageToSend: SendMessage = {
        uid: user.uid,
        displayedName: user.displayName,
        text: newText,
        imageUrl: user.photoURL,
        createdAt: timeStamp,
      };

      try {
        firestore()
          .collection('chatrooms')
          .doc(roomId)
          .collection('messages')
          .add(messageToSend)
          .then(() =>
            firestore().collection('chatrooms').doc(roomId).update({
              latestUpdate: timeStamp,
            }),
          );
      } catch (error) {
        console.log(error);
      }

      //console.log(messageToSend);
      setNewText('');
    }

    Keyboard.dismiss();
  };

  const getMoreMessagesHandler = () => {
    setMessageLimit(prevState => prevState + MESSAGE_NUMBER_INCREMENT);
  };

  return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
          <ChatMessageContainer
            messages={messages}
            currentUserId={user?.uid}
            onGetMoreMessages={getMoreMessagesHandler}
          />
          <ChatInputContainer
            value={newText}
            onChangeText={setNewText}
            onSend={sendMessageHandler}
            onCamera={() => {}}
            onPhotos={() => {}}
          />
        </View>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  noMessageContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
