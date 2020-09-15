import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, FlatList, TextInput } from "react-native";

export default function App() {
  const [list, setList] = React.useState([]);
  const [text, setText] = React.useState();

  const clearList = () => {
    setList([]);
  }

  const addItem = () => {
    setList([...list, {key:text}]);
    setText('');
  }


  return (
    <View style={{ height: 100, flex: 1 }}>
      <View style={styles.inputDisplay}>
        <TextInput
          value={text}
          onChangeText={(text) => setText(text)}
          style={{ borderColor: "gray", borderWidth: 1, width: 200 }}
        />
        <StatusBar style="auto" />
      </View>
      <View style={styles.buttonDisplay}>
        <Button onPress={addItem} title="ADD" />
        <Button onPress={clearList} title="CLEAR" />
      </View>
      <View style={styles.outputDisplay}>
        <Text style={{color: 'blue'}}> Shopping List</Text> 
        <FlatList
          data={list}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputDisplay: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  outputDisplay: {
    flex: 3,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisplay: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
