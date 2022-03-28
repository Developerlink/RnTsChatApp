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
    <TouchableOpacity onPress={() => onPress(item.id)} activeOpacity={0.4}>
      <View style={styles.outer}>
        <View style={styles.infoContainer}>
          <View style={styles.inner}>
            <View>
              <Text style={styles.titleText}>{item.id}</Text>
            </View>
            {/* <View style={styles.rightSide}>
              <Text style={styles.infoText}>{item.latestUpdate}</Text>
            </View> */}
          </View>
          <View>
            <Text style={styles.infoText}>{item.info}</Text>
          </View>
        </View>
        <View style={styles.icon}>
          <Icon name="chevron-right" size={30} color="grey" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  outer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: colors.primaryDark,
    borderBottomWidth: 2,
    padding: 10,
  },
  infoContainer: {width: "90%"},
  inner: {
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
    width: 20,
  },
});
