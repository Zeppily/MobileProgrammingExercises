import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Text, Button, TextInput } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  const [text, setText] = useState('');

  const speak = () => {
    Speech.speak(text);
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.tinput} value={text} placeholder="Enter Text" onChangeText={(text) => setText(text)}/>
      <Button title="PRESS TO HEAR TEXT" onPress={speak} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinput: {
    borderColor: 'gray',
    borderWidth: 2,
    fontSize: 18,
    height: 100,
    width: "80%",
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    padding: 10
  }
});
