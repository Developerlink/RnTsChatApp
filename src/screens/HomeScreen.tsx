import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Button, FlatList, ListRenderItemInfo} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {RootStackScreenProps} from '../navigation/types';
import {ChatRoom} from '../models/chatroom';

import colors from '../constants/colors';
import defaultExport from '@react-native-firebase/firestore';

export default function HomeScreen({
  navigation,
  route,
}: RootStackScreenProps<'Home'>) {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>();
  const db = firestore();
  console.log(chatRooms);

  const fetchChatRooms = () => {
    db.collection('chatrooms')
      .get()
      .then(querySnapshot => {
        const fetchedChatRooms = querySnapshot.docs.map(doc => {
          return {id: doc.id, ...doc.data()} as ChatRoom;
        });
        setChatRooms(fetchedChatRooms);
        console.log(fetchedChatRooms);
      });
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);

  const renderChatRoomItem = (itemData: any) => {
    return (
      <View>
        <Text>{itemData.id}</Text>
      </View>
    );
  };

  // TODO: name, short description of each room
  // TODO: chevron icon
  // TODO: press on room to go to chat
  // TODO: sorted by newest message
  // TODO: pull to refresh or reload the list

  return (
    <FlatList
      style={styles.container}
      data={chatRooms}
      renderItem={renderChatRoomItem}
    />
  );
}

const styles = StyleSheet.create({
  container: {width: '100%', padding: 5},
});
