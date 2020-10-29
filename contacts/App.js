import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contacts, setContacts] = useState({});

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status == 'granted') {
      const { data } = await Contacts.getContactsAsync({});
      if (data.length > 0){
        setContacts(data);
      }
    }
  }


  return (
    <View style={styles.container}>
      <FlatList 
        style={{ marginTop: 20, paddingTop: 20, }}
        keyExtractor={item => item.lookupKey.toString()}
        renderItem={({item}) => 
          <View style={{borderBottomWidth: 2, borderBottomColor: 'gray', flexDirection: 'row',  justifyContent: 'space-between', marginLeft: 30, marginRight: 30}}>
            <Text>
            {item.name}: {item.phoneNumbers[0].number} 
            </Text>
          </View>
        }
        data={contacts}
      />
      <Button onPress={getContacts} title='   Get Contacts   ' />
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
});
