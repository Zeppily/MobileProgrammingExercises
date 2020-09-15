import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput  } from 'react-native';

export default function App() {
  const [number, setNumber] = React.useState();
  const [guess, setGuess] = React.useState();
  const [result, setResult] = React.useState('');
  const [count, setCount] = React.useState();


  useEffect(() =>{
    setNumber(Math.floor(Math.random() * 100) + 1);
    setCount(1);
    setResult("Start Guessing the number!");
  },[]);

  const guessNumber = () => {
    setCount(count + 1);
    if (parseInt(guess) == number){      
      Alert.alert(`You guessed the number in ${count} guesses`);
      setResult("You won!!");
    }
    if (guess > number){      
      setResult(`Your guess ${guess} is too high`);
    }
    if (guess < number){      
      setResult(`Your guess ${guess} is too low`);
    }

  }


  return (
    <View  style={styles.container}>
      <Text>{result}</Text>
      <TextInput value={guess} onChangeText={text => setGuess(text)}
       style={{borderColor: 'gray', borderWidth: 1, width: 200, marginTop: 20, marginBottom:20}} keyboardType='number-pad'/>
      <Button onPress={guessNumber} title="MAKE GUESS"/>      
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
