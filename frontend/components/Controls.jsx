import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Control({pause, onPlay, onPause, onNext, onBack}) {
  return (
    <View className = "mt-14 justify-center items-center flex flex-row">
      <TouchableOpacity style={styles.btn} onPress={onBack}>
        <AntDesign name="banckward" size={32} color="#fff" />
      </TouchableOpacity>
      {pause ? (
        <TouchableOpacity style = {styles.playContainer} onPress={onPlay}>
          <AntDesign name="playcircleo" size={32} color="#000" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style = {styles.playContainer} onPress={onPause}>
          <AntDesign name="pausecircleo" size={32} color="#000" />
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.btn} onPress={onNext}>
        <AntDesign name="forward" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  playContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    borderColor: '#1B1246',
    borderWidth: 16,
    width: 126,
    height: 128,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    shadowColor: '#1B1246',
    shadowOpacity: 0.5,
    elevation: 0.2,
    shadowRadius: 30,
  },
});