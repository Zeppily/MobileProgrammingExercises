import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, FlatList, TextInput } from "react-native";

export default function History({ route, navigation }) {
  const { history } = route.params;

  const styles = StyleSheet.create({
    textContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20
    }
});
 
  return (
    <View style={styles.textContainer}>
      <Text>History:</Text>        
        <FlatList data={history} renderItem={({item}) => 
          <Text>{item.key}</Text>} />
    </View>
  );


}