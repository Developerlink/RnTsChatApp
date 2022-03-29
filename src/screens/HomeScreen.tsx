import React, {useCallback, useEffect, useRef, useState} from 'react';
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
import {createSelectorCreator} from 'reselect';

export default function HomeScreen({
  navigation,
  route,
}: RootStackScreenProps<'Home'>) {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>();
  const [isFetching, setIsFetching] = useState(false);
  const isMounted = useRef(false);

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

        // Check ref before updating state
        if (isMounted.current) {
          setChatRooms(fetchedChatRooms);
          //console.log(fetchedChatRooms);
        }
      })
      .catch(error => {
        console.log(error);
        // If a state needs to be updated:
        // isMounted.current && setError(error);
      })
      .finally(() => setIsFetching(false));
  };

  useFocusEffect(
    useCallback(() => {
      isMounted.current = true;
      fetchChatRooms();
      return () => isMounted.current = false;
    }, []),
  );

  const enterChatRoomHandler = (roomId: string) => {
    navigation.navigate('ChatRoom', {roomId});
  };

  const renderChatRoomItem = ({item}: ListRenderItemInfo<ChatRoom>) => {
    return (
      <View>
        <ChatRoomItem onPress={enterChatRoomHandler} item={item} />
      </View>
    );
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
