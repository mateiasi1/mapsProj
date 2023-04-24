import React, { useContext, useEffect, useState } from "react";
import { Button, SafeAreaView, ScrollView } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { FAB } from "react-native-paper";

import Event from "../../models/Event";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import axios from "axios";
import calculateDistance from "../helpers/calculateDistance";
import { UserContext } from "../../contexts/userContext";
import UserRoles from "../../models/UserRoles";

type Prop = {
    id: string;
    latitude: number;
    longitude: number;
};
const apiKey = "AIzaSyDL0CkTAL35ku-O53PGIi_aM4A4I1FS4rQ";

const MapScreen = ({ route, navigation }) => {
    const { user } = useContext(UserContext);
    const [placeId, setPlaceId] = useState("");
    //GET this from the context when the home will save it there
    const currentLocation = {
        id: "68.12760936383249",
        latitude: 44.32970461331131,
        longitude: 23.77482209354639,
    } as Prop;
    const [markers, setMarkers] = useState<Prop[]>([
        {
            id: null,
            latitude: null,
            longitude: null,
        },
    ]);
    useEffect(() => {
        axios
            .get(
                `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`
            )
            .then((res) => {
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
            calculateDistance(
                currentLocation.latitude,
                currentLocation.longitude,
                event.nativeEvent.coordinate.latitude,
                event.nativeEvent.coordinate.longitude
            )
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

        if (markers.some((item) => item.id === obj.id)) {
            setMarkers(markers.filter((item) => item.id !== obj.id));

            return;
        }
        setMarkers([...markers, obj]);
        navigation.navigate("Events", {
            itemId: obj.id,
            otherParam: "anything you want here",
        });
    };
    const onFabPress = () => {
        if (visible === true) {
            setVisible(false);
            return;
        }

        if (markers.some((item) => item.id === currentLocation.id.toString())) {
            setMarkers(
                markers.filter(
                    (item) => item.id !== currentLocation.id.toString()
                )
            );

            return;
        }
        setMarkers([...markers, currentLocation]);
        navigation.navigate("Events", {
            itemId: currentLocation.id,
            otherParam: "anything you want here",
        });
    };
    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    useEffect(() => {
        if (route.params?.post) {
            var index = markers.indexOf(route.params?.post);
            markers.splice(index, 1);
            setMarkers([...markers]);
        }
    }, [route.params?.post]);

    return (
        <SafeAreaView style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                initialRegion={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
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
                            ></Marker>
                        )
                )}
            </MapView>
            {user.userRole === UserRoles.User && (
                <FAB
                    icon="plus"
                    color="#fff"
                    style={styles.fab}
                    onPress={() => (
                        navigation.navigate("Events", {
                            itemId: currentLocation.id,
                            otherParam: "anything you want here",
                        }),
                        onFabPress()
                    )}
                />
            )}
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

        height: Dimensions.get("window").height,
    },
    fab: {
        position: "absolute",
        right: 0,
        bottom: 0,
        margin: 16,
        backgroundColor: "#f4511e",
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
