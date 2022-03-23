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

export default function ChatRoomScreen({
  navigation,
  route,
}: RootStackScreenProps<'ChatRoom'>) {
  const [newText, setNewText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const {user} = useAuthContext();
  const [roomId, setRoomId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messageLimit, setMessageLimit] = useState(5);
  console.log(isLoading);

  const fetchMessages = (roomId: string) => {
    setIsLoading(true);
    firestore()
      .collection('chatrooms')
      .doc(roomId)
      .collection('messages')
      .limit(messageLimit)
      .orderBy('createdAt', 'desc')
      .get()
      .then(querySnapshot => {
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
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  };

  const sendMessageHandler = () => {
    if (user && newText.length > 0) {
      const messageToSend: SendMessage = {
        uid: user.uid,
        displayedName: user.displayName,
        text: newText,
        imageUrl: user.photoURL,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };

      try {
        firestore()
          .collection('chatrooms')
          .doc(roomId)
          .collection('messages')
          .add(messageToSend);
      } catch (error) {
        console.log(error);
      }

      console.log(messageToSend);
      setNewText('');
    }

    Keyboard.dismiss();
  };


  const refreshHandler = () => {
    setIsLoading(true);
    console.log("refreshing")
    setIsLoading(false);
  }

  useEffect(() => {

    fetchMessages(roomId);
  }, [messageLimit, roomId])

  useEffect(() => {
    const {roomId} = route.params;
    navigation.setOptions({title: roomId + ' Chat'});
    setRoomId(roomId);
    // console.log(roomId);
  }, []);

  // hent beskeder fra firebase
  // automatisk opdater fra firebase

  if (isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={colors.primaryDark} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
      style={{flex: 1}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1}}>
          {messages.length > 0 ? (
            <ChatMessageContainer
              messages={messages}
              currentUserId={user?.uid}
              isLoading={isLoading}
              onRefresh={refreshHandler}
            />
          ) : (
            <View style={styles.noMessageContainer}>
              <Text>There are no messages to display yet</Text>
            </View>
          )}
          <ChatInputContainer
            value={newText}
            onChangeText={setNewText}
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
  noMessageContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
