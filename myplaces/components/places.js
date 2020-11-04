import React, { useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Alert } from "react-native";
import { Input, Button, Icon, ListItem } from "react-native-elements";
import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyD6U_GTO8Ckb1MiAHE6eYC9L9edKdcNCy8",
  authDomain: "myplacesapp-a4ccc.firebaseapp.com",
  databaseURL: "https://myplacesapp-a4ccc.firebaseio.com",
  projectId: "myplacesapp-a4ccc",
  storageBucket: "myplacesapp-a4ccc.appspot.com",
  messagingSenderId: "599440566210",
  appId: "1:599440566210:web:20f02db29a1f1d9b3a185b",
};
// check if loaded, if not load firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default function Places({ navigation }) {
  const [address, setAddress] = React.useState("");
  const [addressList, setAddressList] = React.useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref("addresses/")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        const prods = Object.values(data)
        const test = Object.keys(data)

        //setAddressList(prods);
        var items = test.map((key, index) => {
            return {
              key: key,
              address: prods[index].address
            }
        });
        setAddressList(items);
      });
  }, []);

  const saveAddress = () => {
    firebase.database().ref("addresses/").push({ address: address });
  };

  const deleteAddress = (item) => {
    let key = firebase.database().ref("addresses/" + item).remove();
  }

  renderItem = ({ item }) => (    
    <ListItem bottomDivider onPress={() => navigation.navigate('Map', {address: item.address})} 
    onLongPress={() => deleteAddress(item.key)}>
      <ListItem.Content>
        <ListItem.Title>{item.address}</ListItem.Title>
        <ListItem.Subtitle>{item.key}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron color="white" />
    </ListItem>
  )

  return (
    <View>
      <Input
        value={address}
        onChangeText={(item) => setAddress(item)}
        placeholder="Type in address..."
        leftIcon={<Icon name="location-on" size={24} color="black" />}
      />
      <Button
        icon={<Icon name="save" color="#fff" />}
        onPress={saveAddress}
        title=" SAVE"
      />
      <FlatList
          data={addressList}
          renderItem={renderItem}
        />
    </View>
  );
}
