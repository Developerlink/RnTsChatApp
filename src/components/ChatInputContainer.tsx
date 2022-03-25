import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
// import storage from '@react-native-firebase/storage';
// import * as Progress from 'react-native-progress';

import colors from '../constants/colors';

interface Props {
  value: string;
  onChangeText: (value: string) => void;
  onSendPress: () => void;
  onCameraPress: () => void;
  onImageLibraryPress: () => void;
  image: string;
  onCancelImagePress: () => void;
}

export default function ChatInputContainer({
  value = '',
  onChangeText,
  onSendPress,
  onCameraPress,
  onImageLibraryPress,
  image,
  onCancelImagePress: onCancelPress,
}: Props) {
  // const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  // const onSelectImagePress = useCallback(() => {
  //   const options: ImageLibraryOptions = {
  //     selectionLimit: 1,
  //     mediaType: 'photo',
  //     includeBase64: false,
  //   };

  //   launchImageLibrary(options, response => {
  //     let uri: string | undefined;
  //     if (response.assets) {
  //       uri = response.assets[0].uri;
  //       setImage(uri!);
  //     }
  //   }).catch(error => console.log(error));
  // }, []);

  // const onTakeImagePress = useCallback(() => {
  //   const options: CameraOptions = {
  //     saveToPhotos: true,
  //     mediaType: 'photo',
  //     includeBase64: false,
  //   };

  //   launchCamera(options, response => {
  //     let uri: string | undefined;
  //     if (response.assets) {
  //       uri = response.assets[0].uri;
  //       setImage(uri!);
  //     }
  //   }).catch(error => console.log(error));
  // }, []);

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
          value={value}
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
