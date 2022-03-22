import React from 'react';
import {View, TouchableOpacity, TextInput, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import colors from '../constants/colors';

interface Props {
  value: string;
  onChangeText: (value: string) => void;
  onSend: () => void;
  onCamera: () => void;
  onPhotos: () => void;
}

export default function ChatInputContainer({
  value = '',
  onChangeText,
  onSend,
  onCamera,
  onPhotos,
}: Props) {
  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity style={styles.iconButton} onPress={() => {}}>
        <FontAwesome name="camera-retro" size={30} color={colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={() => {}}>
        <FontAwesome name="photo" size={30} color={colors.primary} />
      </TouchableOpacity>
      <TextInput
        style={styles.textInput}
        placeholder="Type a message..."
        multiline={true}
        numberOfLines={1}
        value={value}
        onChangeText={newValue => onChangeText(newValue)}
      />
      <TouchableOpacity style={styles.iconButton} onPress={onSend}>
        <Ionicon name="send" size={30} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    marginRight: 5,
  },
  iconButton: {
    marginHorizontal: 5,
  },
});
