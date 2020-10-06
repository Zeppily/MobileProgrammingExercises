import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Alert, View, TextInput, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function App() {
  const [adress, setAdress] = React.useState();
  const [location, setLocation] = React.useState({
    latitude: 60.200692,
    longitude: 24.934302,
  });

  const findAdress = () => {
    fetch(
      `http://www.mapquestapi.com/geocoding/v1/address?key=Oz5pXi92RoSMl2xfmQQZn6fq6yDzmBCR&location=${adress}`
    )
      .then((response) => response.json())
      .then((responseData) => {
        setLocation({
          ...location,
          latitude: responseData.results[0].locations[0].latLng.lat,
          longitude: responseData.results[0].locations[0].latLng.lng,
        });
      })
      .catch((er) => {
        Alert.alert("error", toString(er));
      });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={{ flex: 0.85 }}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Haaga-Helia"
        />
      </MapView>
      <StatusBar style="auto" />
      <View style={{ flex: 0.15 }}>
        <TextInput
          value={adress}
          onChangeText={(text) => setAdress(text)}
          style={{
            borderColor: "gray",
            borderWidth: 1,
            width: "100%",
            marginTop: 20,
            marginBottom: 10,
          }}
        />
        <Button onPress={findAdress} title="SHOW" style={{ width: "100%" }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
