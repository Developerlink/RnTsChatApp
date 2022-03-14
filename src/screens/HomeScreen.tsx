import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {RootStackScreenProps} from '../navigation/types';

import colors from '../constants/colors';

export default function HomeScreen({
  navigation,
  route,
}: RootStackScreenProps<'Home'>) {
  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
