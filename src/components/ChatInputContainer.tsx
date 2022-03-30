import React from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

import colors from '../constants/colors';

interface Props {
  text: string;
  onChangeText: (value: string) => void;
  onSendPress: () => void;
  onCameraPress: () => void;
  onImageLibraryPress: () => void;
  image: string;
  onCancelImagePress: () => void;
}

export default function ChatInputContainer({
  text = '',
  onChangeText,
  onSendPress,
  onCameraPress,
  onImageLibraryPress,
  image,
  onCancelImagePress: onCancelPress,
}: Props) {

  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity style={styles.iconButton} onPress={onCameraPress}>
        <FontAwesome name="camera-retro" size={30} color={colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={onImageLibraryPress}>
        <FontAwesome name="photo" size={30} color={colors.primary} />
      </TouchableOpacity>

      <View style={styles.inputField}>
        {image !== '' && (
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: image,
              }}
            />
            <TouchableOpacity style={styles.iconButton} onPress={onCancelPress}>
              <Feather name="x" size={30} color={'darkred'} />
            </TouchableOpacity>
          </View>
        )}

        <TextInput
          placeholder="Type a message..."
          multiline={true}
          numberOfLines={1}
          value={text}
          onChangeText={newValue => onChangeText(newValue)}
        />
      </View>
      
      <TouchableOpacity style={styles.iconButton} onPress={onSendPress}>
        <Ionicon name="send" size={30} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    borderTopColor: colors.primaryDark,
    borderTopWidth: 1,
  },
  inputField: {
    flex: 1,
    flexDirection: 'column',    
    marginLeft: 10,
    marginRight: 5,
  },
  imageContainer: {flexDirection: 'row', justifyContent: "center", alignItems: "center"},
  image: {
    height: 150,
    width: 140,
  },
  iconButton: {
    marginHorizontal: 5,
  },
});
