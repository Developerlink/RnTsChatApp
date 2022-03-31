import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {
  launchImageLibrary,
  CameraOptions,
  launchCamera,
  ImageLibraryOptions,
} from 'react-native-image-picker';

import {RootStackScreenProps} from '../navigation/types';
import ChatInputContainer from '../components/ChatInputContainer';
import ChatMessageContainer from '../components/ChatMessageContainer';
import {useAuthContext} from '../store/authContext';
import {Message, SendMessage} from '../models/message';

const MESSAGE_NUMBER_INCREMENT = 50;

export default function ChatRoomScreen({
  navigation,
  route,
}: RootStackScreenProps<'ChatRoom'>) {
  const [roomId, setRoomId] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageLimit, setMessageLimit] = useState(50);
  const [newMessage, setNewMessage] = useState('');
  const [image, setImage] = useState('');
  const {user} = useAuthContext();
  const isMounted = useRef(false);

  // Setting header title and roomId
  useEffect(() => {
    const {roomId} = route.params;
    navigation.setOptions({title: roomId + ' Chat'});
    setRoomId(roomId);
  }, []);

  // Fetching messages from database
  useEffect(() => {
    isMounted.current = true;
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
        isMounted && setMessages(fetchedMessages);
      });
      
      return () => {
        subscriber();
        isMounted.current = false;
      };
    }, [roomId, messageLimit]);
    
  // Selecting image from library
  const onImageLibraryPress = useCallback(() => {
    const options: ImageLibraryOptions = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      let uri: string | undefined;
      if (response.assets) {
        uri = response.assets[0].uri;
        setImage(uri!);
      }
    }).catch(error => console.log(error));
  }, []);

  // Taking photo with camera
  const onCameraPress = useCallback(() => {
    const options: CameraOptions = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };

    launchCamera(options, response => {
      let uri: string | undefined;
      if (response.assets) {
        uri = response.assets[0].uri;
        setImage(uri!);
      }
    }).catch(error => console.log(error));
  }, []);

  const onCancelImagePress = useCallback(() => {
    setImage('');
  }, []);

  const onSendPress = useCallback(async () => {
    if ((user && image !== '') || (user && newMessage.length > 0)) {
      const fileName = image.split('/').pop();
      const reference = storage().ref(`/images/${fileName}`);
      try {
        let messageToSend: SendMessage;
        const timeStamp = firestore.FieldValue.serverTimestamp();

        if (image !== '') {
          const task = await reference.putFile(image);
          const messageImageUrl = await storage()
            .ref(`/images/${fileName}`)
            .getDownloadURL();

          messageToSend = {
            uid: user.uid,
            displayedName: user.displayName,
            text: newMessage,
            imageUrl: user.photoURL,
            createdAt: timeStamp,
            messageImageUrl: messageImageUrl,
          };
        } else {
          messageToSend = {
            uid: user.uid,
            displayedName: user.displayName,
            text: newMessage,
            imageUrl: user.photoURL,
            createdAt: timeStamp,
          };
        }

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

        setImage('');
        setNewMessage('');
      } catch (error) {
        console.log(error);
      }
    }
    Keyboard.dismiss();
  }, [image, newMessage]);

  const getMoreMessagesHandler = useCallback(() => {
    setMessageLimit(prevState => prevState + MESSAGE_NUMBER_INCREMENT);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex: 1}}>
        <ChatMessageContainer
          messages={messages}
          currentUserId={user?.uid}
          onGetMoreMessages={getMoreMessagesHandler}
        />
        <ChatInputContainer
          text={newMessage}
          onChangeText={setNewMessage}
          onSendPress={onSendPress}
          onCameraPress={onCameraPress}
          onImageLibraryPress={onImageLibraryPress}
          image={image}
          onCancelImagePress={onCancelImagePress}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  noMessageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 150,
    width: 140,
  },
});
