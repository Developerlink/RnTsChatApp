import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  ListRenderItemInfo,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {RootStackScreenProps} from '../navigation/types';
import {ChatRoom} from '../models/chatroom';
import ChatRoomItem from '../components/ChatRoomItem';
import colors from '../constants/colors';
import TestingScreen from './TestingScreen';
import {useFocusEffect} from '@react-navigation/native';

export default function HomeScreen({
  navigation,
  route,
}: RootStackScreenProps<'Home'>) {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>();
  const [isFetching, setIsFetching] = useState(false);

  const fetchChatRooms = () => {
    setIsFetching(true);
    firestore()
      .collection('chatrooms')
      .orderBy('latestUpdate', 'desc')
      .get()
      .then(querySnapshot => {
        const fetchedChatRooms = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
            ...doc.data(),
            latestUpdate: doc
              .data()
              .latestUpdate.toDate()
              .toISOString()
              .slice(2, 19)
              .replace(/-/g, '/')
              .replace('T', ' '),
          } as ChatRoom;
        });
        setChatRooms(fetchedChatRooms);
        //console.log(fetchedChatRooms);
      })
      .catch(error => console.log(error))
      .finally(() => setIsFetching(false));
  };

  useEffect(() => {
    fetchChatRooms();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchChatRooms();
      return () => {};
    }, []),
  );

  const enterChatRoomHandler = (roomId: string) => {
    navigation.navigate('ChatRoom', {roomId});
  };

  const renderChatRoomItem = ({item}: ListRenderItemInfo<ChatRoom>) => {
    return <ChatRoomItem onPress={enterChatRoomHandler} item={item} />;
  };

  // TODO: sorted by newest message

  return (
    <FlatList
      style={styles.container}
      data={chatRooms}
      renderItem={renderChatRoomItem}
      refreshing={isFetching}
      onRefresh={() => fetchChatRooms()}
    />
  );
}

const styles = StyleSheet.create({
  container: {width: '100%'},
});
