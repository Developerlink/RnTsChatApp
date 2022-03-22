import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';

import colors from '../constants/colors';

export default function TestingScreen() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.inner}>
        <View style={styles.messageContainer}>
          <Text>test</Text>
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.iconButton}>
            <View>
              <FontAwesome name="photo" size={30} color={colors.primary} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <View>
              <FontAwesome
                name="camera-retro"
                size={30}
                color={colors.primary}
              />
            </View>
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            multiline={true}
            numberOfLines={1}
          />
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => {
              Keyboard.dismiss();
            }}>
            <View>
              <Ionicon name="send" size={30} color={colors.primary} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  inner: {
    flex: 1,
  },
  messageContainer: {flex: 1, borderBottomColor: colors.primaryDark, borderBottomWidth: 2},
  inputContainer: {flexDirection: 'row', alignItems: 'center', paddingBottom: 5},
  textInput: {
    flex: 1,
    marginLeft: 10,
    marginRight: 5
  },
  iconButton: {    
    marginHorizontal: 5
  },
});
