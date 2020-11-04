import React from "react";
import { NavigationContainer, TabActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Map from "./components/map.js";
import Places from "./components/places.js";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="My Places" component={Places} />
        <Stack.Screen name ="Map" component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
