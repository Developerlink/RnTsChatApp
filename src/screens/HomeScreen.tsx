import React, {useCallback, useRef, useState} from 'react';
import {View, StyleSheet, FlatList, ListRenderItemInfo} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import {RootStackScreenProps} from '../navigation/types';
import ChatRoomItem from '../components/ChatRoomItem';
import {ChatRoom} from '../models/chatroom';

export default function HomeScreen({navigation}: RootStackScreenProps<'Home'>) {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>();
  const [isFetching, setIsFetching] = useState(false);
  const isMounted = useRef(false);

  const fetchChatRooms = async () => {
    setIsFetching(true);
    await firestore()
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
        }
      })
      .catch(error => {
        console.log(error);
        // If a state needs to be updated:
        // isMounted.current && setError(error);
      })
      .finally(() => setIsFetching(false));
  };

  // Reload chatrooms when going back
  useFocusEffect(
    useCallback(() => {
      isMounted.current = true;
      fetchChatRooms();
      return () => (isMounted.current = false);
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

  return (
    <FlatList
      data={chatRooms}
      renderItem={renderChatRoomItem}
      refreshing={isFetching}
      onRefresh={async () => {
        isMounted.current = true;
        await fetchChatRooms();
        isMounted.current = false;
      }}
    />
  );
}

const styles = StyleSheet.create({});
