import React, { useEffect, useState } from "react";
import { Button, Pressable, SafeAreaView, ScrollView } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { FAB } from "react-native-paper";
import { faCar, faPersonWalking } from "@fortawesome/free-solid-svg-icons";
import Event from "../../models/Event";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import axios from "axios";
import EventDTO from "../../models/EventDto";
import MapViewDirections from "react-native-maps-directions";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import HomeScreen from "../home/home.screen";

type Prop = {
  id: number;
  latitude: number;
  longitude: number;
};
const AdminEvent = ({ navigation, route }) => {
  const [placeId, setPlaceId] = useState("");
  const { event } = route.params;
  const [mode, setMode] = useState("DRIVING");

  const [markers, setMarkers] = useState<Prop[]>([
    {
      id: event.id || null,
      latitude: event.location.latitude || null,
      longitude: event.location.longitude || null,
    },
  ]);
  const apiKey = "AIzaSyBfEiIdG9ePXO1ZUIybpauYfNvfgP358B8";
  const origin = { latitude: 44.32751537449618, longitude: 23.800023458898067 };
  const destination = {
    latitude: 44.326266,
    longitude: 23.79852,
  };

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

  const onPress = (mode: string) => {
    setMode(mode);
  };
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        {/* <Button
          title="Go to Details"
          onPress={() => navigation.navigate("Details")}
        /> */}
        <View
          style={{
            marginTop: "5%",
            width: "100%",
            display: "flex",
          }}
        >
          <GooglePlacesAutocomplete
            placeholder="Search"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data.place_id);
              setPlaceId(data.place_id);
            }}
            fetchDetails
            query={{
              key: apiKey,
              language: "en",
            }}
          />
        </View>
      </View>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={{
          latitude: 44.32724051468231,
          longitude: 23.800531066954136,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04,
        }}
        showsCompass={true}
        showsBuildings={true}
        showsTraffic={true}
        showsIndoors={true}
        zoomEnabled={true}
        onPress={onMapPress}
        //onPress={(event) => this.onMapPress(event)}
      >
        {markers.map(
          (marker) =>
            marker.latitude !== null && (
              <Marker
                key={marker.id}
                description={"Origin"}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                tracksViewChanges={true}
                // onDragEnd={(e) =>
                //   setMarkers({
                //     id: e.nativeEvent.coordinate.latitude,
                //     latitude: e.nativeEvent.coordinate.latitude,
                //     longitude: e.nativeEvent.coordinate.longitude,
                //   })
                // }
              ></Marker>
            )
        )}
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={apiKey}
          mode={mode || "DRIVING"}
          strokeWidth={10}
          strokeColor="blue"
          onStart={(params) => {
            console.log(
              `Started routing between "${origin}" and "${destination}"`
            );
          }}
        />
      </MapView>

      {/* <EventPickerDialog visible={visible} hideDialog={hideDialog} /> */}
      <View style={styles.bottomBar}>
        <Pressable style={styles.button} onPress={() => onPress("WALKING")}>
          <FontAwesomeIcon
            icon={faPersonWalking}
            color={event.color}
            size={30}
            style={styles.button}
          />
          <Text>WALKING</Text>
        </Pressable>

        <View style={styles.verticleLine}></View>
        <Pressable style={styles.button} onPress={() => onPress("DRIVING")}>
          <FontAwesomeIcon
            icon={faCar}
            color={event.color}
            size={30}
            style={styles.button}
          />
          <Text>DRIVING</Text>
        </Pressable>
      </View>
      {/* <FAB
        icon="fa-solid fa-person-walking"
        style={styles.fab}
        onPress={() => navigation.navigate("Events")}
      /> */}
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
  button: { display: "flex", flexDirection: "row" },
  bottomBar: {
    backgroundColor: "white",
    color: "white",
    position: "absolute",
    right: 0,
    bottom: 0,
    margin: 0,
    width: "100%",
    height: "10%",

    justifyContent: "space-around",
    padding: "5%",
  },
  search: {
    position: "absolute",
    right: 0,
    top: 0,
    width: Dimensions.get("window").width,
    zIndex: 1,
  },
  verticleLine: {
    height: "100%",
    width: 1,
    backgroundColor: "#909090",
  },
});
export default AdminEvent;
