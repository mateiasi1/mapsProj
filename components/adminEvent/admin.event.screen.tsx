import React, { useEffect, useState } from "react";
import { Linking, Platform, Pressable, SafeAreaView } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

type Prop = {
    id: number;
    latitude: number;
    longitude: number;
};
const AdminEvent = ({ navigation, route }) => {
    const [placeId] = useState("");
    const { event } = route.params;
    const [visible, setVisible] = useState(false);
    const [markers, setMarkers] = useState<Prop[]>([
        {
            id: event.id || null,
            latitude: event.location.latitude || null,
            longitude: event.location.longitude || null,
        },
    ]);
    const apiKey = "AIzaSyDL0CkTAL35ku-O53PGIi_aM4A4I1FS4rQ";

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

        if (markers.some((item) => item.id === obj.id)) {
            setMarkers(markers.filter((item) => item.id !== obj.id));

            return;
        }
        setMarkers([...markers, obj]);
    };

    const onPress = () => {
        var scheme = Platform.OS === "ios" ? "maps:0,0?q=" : "geo:0,0?q=";
        var url = scheme + `${markers[0].latitude}+${markers[0].longitude}`;
        Linking.openURL(url);
    };

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
                            ></Marker>
                        )
                )}
            </MapView>

            {/* <EventPickerDialog visible={visible} hideDialog={hideDialog} /> */}
            <View style={styles.bottomBar}>
                <Pressable style={styles.button} onPress={() => onPress()}>
                    <FontAwesomeIcon
                        icon={faCar}
                        color={event.color}
                        size={30}
                        style={styles.button}
                    />
                    <Text>Go there</Text>
                </Pressable>
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
        // top: 100,
        height: Dimensions.get("window").height,
    },
    fab: {
        position: "absolute",
        right: 0,
        bottom: 0,
        margin: 16,
    },
    button: {
        width: "25%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    bottomBar: {
        backgroundColor: "white",
        color: "white",
        position: "absolute",
        right: 0,
        bottom: 0,
        margin: 0,
        width: "100%",
        height: "10%",
        display: "flex",
        flexDirection: "row",
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
