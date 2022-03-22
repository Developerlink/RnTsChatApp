import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Card from './Card';

import {Message} from '../models/message';

interface Props {
  message: Message;
  putAvatarOnLeft?: boolean;
}

export default function ChatBubble({message, putAvatarOnLeft = true}: Props) {
  return (
    <View style={styles.messageBubble}>
      {putAvatarOnLeft && (
        <Image style={styles.avatar} source={{uri: message.imageUrl}} />
      )}
      <Card style={styles.message}>
        <View style={styles.nameDate}>
          <Text>{message.displayedName}</Text>
          <Text>{message.createdAt}</Text>
        </View>
        <Text>{message.text}</Text>
      </Card>
      {!putAvatarOnLeft && (
        <Image style={styles.avatar} source={{uri: message.imageUrl}} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 35,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  messageBubble: {flexDirection: 'row', marginBottom: 10},
  ownMessageBubble: {
    alignSelf: 'flex-end',
  },
  message: {
    width: '65%',
  },
  nameDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  ownMessageColor: {
    backgroundColor: '#efe',
  },
});
