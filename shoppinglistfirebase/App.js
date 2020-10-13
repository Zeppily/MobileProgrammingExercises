import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, FlatList, TextInput, Alert, AsyncStorage } from "react-native";
import * as firebase from 'firebase';

// db connection
const firebaseConfig = {
  apiKey: "AIzaSyBH3eNZGFnZTQUPvMSHVLsAffIc_lLMcQg",
  authDomain: "shoppinglistfirebase-fbda7.firebaseapp.com",
  databaseURL: "https://shoppinglistfirebase-fbda7.firebaseio.com",
  projectId: "shoppinglistfirebase-fbda7",
  storageBucket: "shoppinglistfirebase-fbda7.appspot.com",
  messagingSenderId: "635901068495",
  appId: "1:635901068495:web:78f7125277ae373a29a3ba"
};

firebase.initializeApp(firebaseConfig);

export default function App() {
  const [list, setList] = React.useState([]);
  const [item, setItem] = React.useState('');
  const [amount, setAmount] = React.useState('');

  // Create table on start up if not exists, else update list
  useEffect(() => {
    firebase.database().ref('items/').on('value', snapshot => {
      const data = snapshot.val();
      const prods = Object.values(data);
      setList(prods);
    })
  }, []);

  // Adds item to DB and calls updateList
  const addItem = () => {
    firebase.database().ref('items/').push(
      {'item': item, 'amount': amount}
    );
  }


  const listSeparator = () => {
    return (
      <View
        style={{
          height: 5,
          width: "80%",
          backgroundColor: "#fff",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
        <TextInput
          value={item}
          onChangeText={(item) => setItem(item)}
          style={{marginTop: 30, fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1}}
          placeholder='item'
        />
        <TextInput
          value={amount}
          onChangeText={(amount) => setAmount(amount)}
          style={{ marginTop: 5, marginBottom: 5,  fontSize:18, width: 200, borderColor: 'gray', borderWidth: 1}}
          placeholder='amount'
        />        
        <StatusBar style="auto" />
        <Button onPress={addItem} title="SAVE" />
        <Text style={{color: 'blue'}}> Shopping List</Text> 
        <FlatList
          data={list}
          renderItem={({ item }) => 
          <View style={styles.listcontainer}>
            <Text style={{fontSize: 20}}>{item.item}, {item.amount}</Text>
          </View>} 
          ItemSeparatorComponent={listSeparator} 
        />

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
  listcontainer: {
   flexDirection: 'row',
   backgroundColor: '#fff',
   alignItems: 'center'
  },
  textInputs: {
    marginTop: 30,
    fontSize: 18,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
  },
 });