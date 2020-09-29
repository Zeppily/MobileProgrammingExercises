import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text,Image, View, Button, TextInput, FlatList } from 'react-native';

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [ingredient, setIngredient] = useState('');


  const getRecipes = () => {
    fetch(`http://www.recipepuppy.com/api/?i=${ingredient}`)
    .then((response) => response.json())
    .then(responseData => {
      setRecipes(responseData.results);
    })
    .catch((er) => {
      Alert.alert('error', er);
    })
  }
  

  const listSeparator = () => {
    return (
      <View
        style={{
          marginTop: "3%",
          width: "80%",
          backgroundColor: "#fffff",
          marginLeft: "10%"
        }}
      />
    );
  };


  return (
    <View style={styles.container}>
        <FlatList 
        style={{marginLeft : "5%"}}
        keyExtractor={item => item.title} 
        renderItem={({item}) => <View><Text>{item.title}</Text><Image 
        source={{uri: item.thumbnail}}
        style={{width: 70, height: 70}}
    /></View>} 
        ItemSeparatorComponent={listSeparator}
        data={recipes} 
      />
      <TextInput 
        style={{fontSize: 18, width: 200}} 
        value={ingredient} 
        placeholder="Ingredients"
        onChangeText={(ingredient) => setIngredient(ingredient)} 
      />
     <Button title="Find" onPress={getRecipes} />
     <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
