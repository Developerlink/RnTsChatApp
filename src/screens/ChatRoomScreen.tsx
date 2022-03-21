import React, {useEffect} from 'react';
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
        <View style={styles.input}></View>
        <View style={styles.buttonsContainer}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1},
  messageContainer: {flex: 1, borderBottomColor: colors.primaryDark, borderBottomWidth: 2},
  inputContainer: {height: 100},
  input: {},
  buttonsContainer: {}
});
