import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button, FlatList, TextInput } from "react-native";
import { NavigationContainer, TabActions} from'@react-navigation/native';
import { createStackNavigator} from'@react-navigation/stack';
import  Calculator from './components/Calculator.js';
import  History from './components/History.js';

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calculator" component={Calculator}/>
        <Stack.Screen name="History" component={History}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}