import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {RootStackScreenProps} from '../navigation/types';

import colors from '../constants/colors';

export default function ChatRoomScreen({
  navigation,
  route,
}: RootStackScreenProps<'ChatRoom'>) {
  return (
    <View>
      <Text>Chat Room</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
