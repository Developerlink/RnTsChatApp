import React, { useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import colors from '../constants/colors';
import ChatBubble from './ChatBubble';
import {Message} from '../models/message';

interface Props {
  messages: Message[] | null;
  currentUserId?: string;
  onGetMoreMessages: () => void;
}

export default function ChatMessageContainer({
  messages,
  currentUserId,
  onGetMoreMessages,
}: Props) {
  const [isFetching, setIsFetching] = useState(false);

  const renderMessageItem = ({item}: ListRenderItemInfo<Message>) => {
    const isOwnMessage = item.uid === currentUserId ? true : false;
    return <ChatBubble message={item} isOwnMessage={isOwnMessage} />;
  };

  if (!messages || messages.length === 0) {
    return (
      <View style={styles.noMessageContainer}>
        <Text>There are no messages to display yet</Text>
      </View>
    );
  }



  return (
    <FlatList
      style={styles.messageContainer}
      contentContainerStyle={styles.contentStyle}
      data={messages}
      renderItem={renderMessageItem}      
      inverted
      onEndReached={onGetMoreMessages}
      onEndReachedThreshold={0.001}
      scrollEventThrottle={150}
    />
  );
}

const styles = StyleSheet.create({
  messageContainer: {
    flex: 1,
    paddingVertical: 10,
    borderBottomColor: colors.primaryDark,
    borderBottomWidth: 2,
  },
  contentStyle: {paddingBottom: 30},
  noMessageContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
