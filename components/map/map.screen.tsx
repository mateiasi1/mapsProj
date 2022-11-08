import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, ScrollView } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { FAB } from "react-native-paper";

import Event from "../../models/Event";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import axios from "axios";

type Prop = {
    id: string;
    latitude: number;
    longitude: number;
};
const apiKey = "AIzaSyBfEiIdG9ePXO1ZUIybpauYfNvfgP358B8";

const MapScreen = ({ navigation }) => {
    const [placeId, setPlaceId] = useState("");
    //GET this from the context when the home will save it there
    const currentLocation = {
        id: 68.12760936383249,
        latitude: 44.32734148863794,
        longitude: 23.80026787519455,
    };
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
        if (
            event.nativeEvent.coordinate.latitude >
                currentLocation.latitude + 0.0002 ||
            event.nativeEvent.coordinate.longitude ===
                currentLocation.longitude + 0.002
        ) {
            alert("The event is too far away from you!");
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

            {/* <EventPickerDialog visible={visible} hideDialog={hideDialog} /> */}
            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => navigation.navigate("Events")}
            />
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
export default MapScreen;
