import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button, FlatList, TextInput, Alert, AsyncStorage } from "react-native";
import * as SQLite from 'expo-sqlite';

// db connection
const db = SQLite.openDatabase('shoppingList.db');

export default function App() {
  const [list, setList] = React.useState([]);
  const [item, setItem] = React.useState('');
  const [amount, setAmount] = React.useState('');

  // Create table on start up if not exists, else update list
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shopping (id integer primary key not null, item text, amount text);');
    });
    updateList();
  }, []);

  // UpdateList called by other functions to update local list with rows from DB
  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shopping;', [], (_, { rows }) =>
      setList(rows._array)
      );
    });
  } 

  // Adds item to DB and calls updateList
  const addItem = () => {
    db.transaction(tx => {
      tx.executeSql('insert into shopping (item, amount) values (?, ?);', [item, amount]);
    }, null, updateList
    )
  }

  const deleteItem = (id) => {
    db.transaction(
      tx => {
        tx.executeSql(`delete from shopping where id = ?;`, [id]);
      }, null, updateList
    )
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
        <Button onPress={addItem} title="ADD" />
        <Text style={{color: 'blue'}}> Shopping List</Text> 
        <FlatList
          data={list}
          keyExtractor={item => item.id.toString()} 
          renderItem={({ item }) => 
          <View style={styles.listcontainer}>
            <Text style={{fontSize: 20}}>{item.item}, {item.amount}</Text>
            <Text style={{fontSize: 20, color: '#0000ff'}} onPress={() => deleteItem(item.id)}> bought</Text>
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
