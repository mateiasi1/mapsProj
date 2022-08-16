import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, ScrollView } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { FAB } from "react-native-paper";

import EventPickerDialog from "./EventPickerDialog";
import Event from "../../models/Event";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import axios from "axios";

type Prop = {
  id: string;
  latitude: number;
  longitude: number;
};
const apiKey = "AIzaSyBfEiIdG9ePXO1ZUIybpauYfNvfgP358B8";

const HomeScreen = ({ navigation }) => {
  const [placeId, setPlaceId] = useState("");
  const [markers, setMarkers] = useState<Prop[]>([
    {
      id: null,
      latitude: null,
      longitude: null,
    },
  ]);
  useEffect(() => {
    debugger;
    axios
      .get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`
      )
      .then((res) => {
        // console.log(res.data);
        console.log(
          "lat:" +
            res.data.result.geometry.location.lat +
            " long: " +
            res.data.result.geometry.location.lng
        );
        setMarkers([
          ...markers,
          {
            id:
              res.data.result.geometry.location.lat +
              res.data.result.geometry.location.lng,
            latitude: res.data.result.geometry.location.lat,
            longitude: res.data.result.geometry.location.lng,
          } as Prop,
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [placeId]);

  const [visible, setVisible] = useState(false);
  const onMapPress = (event) => {
    if (visible === true) {
      setVisible(false);
      return;
    }
    const obj = {
      id:
        event.nativeEvent.coordinate.latitude +
        event.nativeEvent.coordinate.longitude,
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    } as Prop;
    debugger;

    if (markers.some((item) => item.id === obj.id)) {
      console.log("item" + obj.id);
      console.log(markers);
      setMarkers(markers.filter((item) => item.id !== obj.id));

      return;
    }
    setMarkers([...markers, obj]);
  };
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        <Button title="Admin" onPress={() => navigation.navigate("Admin")} />
        <Button title="User" onPress={() => navigation.navigate("Map")} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    // height: "30%",
    top: 100,
    height: Dimensions.get("window").height,
  },
  fab: {
    position: "absolute",
    right: 0,
    bottom: 0,
    margin: 16,
  },
  search: {
    position: "absolute",
    right: 0,
    top: 0,
    width: Dimensions.get("window").width,
    zIndex: 1,
  },
});
export default HomeScreen;
