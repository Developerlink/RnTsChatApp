import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {RootStackScreenProps} from '../navigation/types';

import colors from '../constants/colors';

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
  

  // TODO: last 50 messages
  // TODO: scroll to load more
  // TODO: realtime message updates
  // TODO: avatar, name, date, text

  return (
    <View>
      <Text>Chat Room</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
