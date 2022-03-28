import React, { memo } from 'react';
import {Image, StyleSheet, Text, View, Dimensions} from 'react-native';
import Card from './Card';

import {Message} from '../models/message';

interface Props {
  message: Message;
  isOwnMessage: boolean;
}

export default memo(function ChatBubble({message, isOwnMessage}: Props) {
  return (
    <View
      style={
        isOwnMessage ? styles.ownMessageContainer : styles.messageContainer
      }>
      {!isOwnMessage && (
        <Image style={styles.avatar} source={{uri: message.imageUrl}} />
      )}
      <Card style={isOwnMessage ? styles.ownMessage : styles.message}>
        <View style={styles.name}>
          <Text>{message.displayedName}</Text>
        </View>
        {message.messageImageUrl && (
          <Image
            style={styles.messageImage}
            source={{uri: message.messageImageUrl}}
            resizeMode={'contain'}
          />
        )}
        <Text>{message.text}</Text>
        <View style={styles.date}>
          <Text>{message.createdAt}</Text>
        </View>
      </Card>
      {isOwnMessage && (
        <Image style={styles.avatar} source={{uri: message.imageUrl}} />
      )}
    </View>
  );
})

const styles = StyleSheet.create({
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 35,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  messageContainer: {flexDirection: 'row', marginBottom: 10},
  ownMessageContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'flex-end',
  },
  message: {
    width: '65%',
  },
  ownMessage: {
    backgroundColor: '#efe',
    width: '65%',
  },
  name: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 5,
  },
  date: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  messageImage: {width: '80%', height: 200, marginBottom: 5},
});
