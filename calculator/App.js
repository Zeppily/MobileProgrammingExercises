import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';

export default function App() {

  const [value1, setValue1] = React.useState();
  const [value2, setValue2] = React.useState();
  const [solution, setSolution] = React.useState('No calculation done yet!');

  const calculateSum = () => {
    setSolution(parseInt(value1) + parseInt(value2));
  }

  const calculateSubstract = () => {
    setSolution(parseInt(value1) - parseInt(value2));
  }

  const styles = StyleSheet.create({
    buttonContainer: {
      flexDirection: 'row', 
      justifyContent: 'space-around',
      marginLeft: 130,
      marginRight: 130,
      marginTop: 10

    }
  });
  

  return (
    <View style={{height: 100, flex: 1, justifyContent: 'center'}}>
      <View style={{ alignItems: 'center', justifyContent: 'center'}}>
        <Text>Result: {solution}</Text>
        <TextInput value={value1} onChangeText={text => setValue1(text)} style={{borderColor: 'gray', borderWidth: 1, width: 200}} keyboardType='number-pad'/>
        <TextInput value={value2} onChangeText={text => setValue2(text)} style={{borderColor: 'gray', borderWidth: 1, width: 200}} keyboardType='number-pad'/>
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={calculateSum} title="+"/>
        <Button onPress={calculateSubstract} title="-" />
        <StatusBar style="auto" />
      </View>
    </View>
  );
}



