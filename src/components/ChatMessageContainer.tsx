import React from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet} from 'react-native';

import colors from '../constants/colors';
import ChatBubble from './ChatBubble';
import {Message} from '../models/message';

interface Props {
  messages: Message[];
  currentUserId?: string;
  isLoading: boolean;
  onRefresh: () => void;
}

export default function ChatMessageContainer({messages, currentUserId, isLoading, onRefresh}: Props) {
  const renderMessageItem = ({item}: ListRenderItemInfo<Message>) => {
    const isOwnMessage = item.uid === currentUserId ? true : false;
    return <ChatBubble message={item} isOwnMessage={isOwnMessage} />;
  };

  return (
    <FlatList
    style={styles.messageContainer}
    contentContainerStyle={styles.contentStyle}
    data={messages}
    renderItem={renderMessageItem}
    refreshing={isLoading}
    onRefresh={onRefresh}
    inverted
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
  contentStyle: {paddingBottom: 30}
});
