import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View,  FlatList, TextInput, Alert, AsyncStorage } from "react-native";
import * as SQLite from 'expo-sqlite';
import { Header, Input, Button, Icon, ListItem } from 'react-native-elements';

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

  
  renderItem = ({ item }) => (    
    <ListItem bottomDivider onLongPress={() => deleteItem(item.id)}>
      <ListItem.Content>
        <ListItem.Title>{item.item}</ListItem.Title>
        <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron color="white" />
    </ListItem>
  )


  return (
    <View>
      <Header centerComponent={{text: 'SHOPPING LIST', style: {color:'#fff'}}} />
        <Input
          value={item}
          onChangeText={(item) => setItem(item)}          
          placeholder='Product'
        />
        <Input
          value={amount}
          onChangeText={(amount) => setAmount(amount)}          
          placeholder='amount'
        />        
        <StatusBar style="auto" />
        <Button icon={<Icon name='save' color='#fff' />} onPress={addItem} title=" SAVE" />
        <Text>Hold down on an item to delete</Text>
        <FlatList
          data={list}
          keyExtractor={item => item.id.toString()} 
          renderItem={renderItem}
          ItemSeparatorComponent={listSeparator} 
        />

    </View>
  );
}
