import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { FAB } from "react-native-paper";
import {
  faCar,
  faCarCrash,
  faLock,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import EventPickerDialog from "./EventPickerDialog";
import Event from "../../models/Event";
type Prop = {
  id: number;
  latitude: number;
  longitude: number;
};

const events = [
  {
    id: 1,
    title: "Car crash",
    icon: faCarCrash,
    color: "black",
    subEvents: [
      {
        id: 1,
        title: "Car crash",
        icon: faCarCrash,
        color: "black",
      },
      { id: 2, title: "Car", icon: faCar, color: "black" },
    ],
  },
  { id: 2, title: "Car", icon: faCar, color: "black" },
] as Event[];
const HomeScreen = () => {
  const [markers, setMarkers] = useState<Prop[]>([
    {
      id: null,
      latitude: null,
      longitude: null,
    },
  ]);
  const [visible, setVisible] = useState(false);
  const onMapPress = (event) => {
    const obj = {
      id: event.nativeEvent.coordinate.latitude,
      latitude: event.nativeEvent.coordinate.latitude,
      longitude: event.nativeEvent.coordinate.longitude,
    } as Prop;
    debugger;

    if (markers.some((item) => item.id === obj.id)) {
      setMarkers(markers.filter((item) => item.id !== obj.id));

      return;
    }
    setMarkers([...markers, obj]);
  };
  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  return (
    <SafeAreaView style={styles.container}>
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
        <EventPickerDialog
          visible={visible}
          hideDialog={hideDialog}
          events={events}
        />
        {markers.map(
          (marker) =>
            marker.latitude !== null && (
              <Marker
                key={marker.id}
                description="Origin"
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
      </MapView>

      <FAB icon="plus" style={styles.fab} onPress={showDialog} />
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
    height: Dimensions.get("window").height,
  },
  fab: {
    position: "absolute",
    right: 0,
    bottom: 0,
    margin: 16,
  },
});
export default HomeScreen;
