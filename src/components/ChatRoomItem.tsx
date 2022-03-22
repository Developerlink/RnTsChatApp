import React, {FC} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ChatRoom} from '../models/chatroom';
import Icon from 'react-native-vector-icons/FontAwesome5';

import colors from '../constants/colors';

interface Props {
  item: ChatRoom;
  onPress: (roomId: string) => void;
}

export default function ChatRoomItem({item, onPress}: Props) {
  return (
    <TouchableOpacity onPress={() => onPress(item.id)} activeOpacity={0.6}>
      <View style={styles.container}>
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{item.id}</Text>
          </View>
          <View>
            <Text style={styles.infoText}>{item.info}</Text>
          </View>
        </View>
        <View style={styles.rightSide}>
          <Text style={styles.infoText}>Jan 12</Text>
          <View style={styles.icon}>
            <Icon name="chevron-right" size={30} color="grey" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: colors.primaryDark,
    borderBottomWidth: 2,
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 24,
    fontWeight: '500',
    color: 'black',
  },
  infoText: {
    fontSize: 16,
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 15,
  },
});
