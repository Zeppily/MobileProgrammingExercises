import React, { useEffect } from "react";
import { StyleSheet, Text, View,  FlatList, TextInput } from "react-native";
import { Header, Input, Button, Icon, ListItem } from 'react-native-elements';
import MapView, { Marker } from "react-native-maps";


export default function Map({route, navigation}) {
    const { address } = route.params;
    const [location, setLocation] = React.useState({
        latitude: 60.200692,
        longitude: 24.934302,
      });

      useEffect(() => {
        fetch(
          `http://www.mapquestapi.com/geocoding/v1/address?key=Oz5pXi92RoSMl2xfmQQZn6fq6yDzmBCR&location=${address}`
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
        }, []);

    return(
        <View style={styles.container}>
            <MapView
        style={{ flex: 1 }}
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
          title={address}
        />
      </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });