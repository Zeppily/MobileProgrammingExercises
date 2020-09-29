import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
} from "react-native";
import { Picker } from "@react-native-community/picker";

export default function App() {
  const [rates, setRates] = useState([]);
  const [amount, setAmount] = useState("");
  const [selected, setSelected] = useState("CAD");
  const [result, setResult] = useState(0);

  const calculate = () => {
    let value = parseFloat(amount);
    let divider = parseFloat(rates[selected]);
    value = value / divider;
    setResult(value.toFixed(2));
  };

  useEffect(() => {
    fetch(`https://api.exchangeratesapi.io/latest`)
      .then((response) => response.json())
      .then((responseData) => {
        setRates(responseData.rates);
      })
      .catch((err) => {
        Alert.alert("Error", err.message);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Image 
        source={{uri:`https://upload.wikimedia.org/wikipedia/en/d/d0/Dogecoin_Logo.png`}}
        style={{width: 250, height: 250}}
    />
      <Text style={{ fontSize: 30 }}>{result} € </Text>
      <View style={styles.inputContainer}>
      <TextInput
        style={{ fontSize: 18, width: 100 }}
        value={amount}
        placeholder="0.00"
        onChangeText={(amount) => setAmount(amount)}
        keyboardType="number-pad"
      />
      <Picker
        selectedValue={selected}
        style={{ height: 50, width: 100 }}
        onValueChange={(itemValue, itemIndex) => setSelected(itemValue)}
      >
        {Object.keys(rates).map((key) => {
          return <Picker.Item label={key} value={key} key={key} />;
        })}
      </Picker>
      </View>
      <Button title="Convert" onPress={calculate} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginLeft: 130,
    marginRight: 130,
    marginTop: 10,
  }
});
