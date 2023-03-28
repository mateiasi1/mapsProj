import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, Text } from "react-native";
import { StyleSheet, View, Dimensions } from "react-native";

import * as Location from "expo-location";
import AccessNotGranted from "../localization/accessNotGranted";

type Prop = {
    id: string;
    latitude: number;
    longitude: number;
};
const apiKey = "AIzaSyDL0CkTAL35ku-O53PGIi_aM4A4I1FS4rQ";

const HomeScreen = ({ navigation }) => {
    const [placeId, setPlaceId] = useState("");
    const [markers, setMarkers] = useState<Prop[]>([
        {
            id: null,
            latitude: null,
            longitude: null,
        },
    ]);

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        (async () => {
            var internalStatus =
                await Location.requestForegroundPermissionsAsync();
            setStatus(await Location.requestForegroundPermissionsAsync());

            if (internalStatus.status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            let location = await Location.getCurrentPositionAsync({});

            setLocation(location);
        })();
    }, []);

    // let text = "Waiting..";
    // if (errorMsg) {
    //     text = errorMsg;
    // } else if (location) {
    //     text = JSON.stringify(location);
    // }

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
            {location ? (
                <View style={styles.search}>
                    {/* <Text>{text}</Text> */}
                    <Button
                        title="Admin"
                        onPress={() => navigation.navigate("Admin")}
                    />
                    <Button
                        title="User"
                        onPress={() => navigation.navigate("Map")}
                    />
                    <Button
                        title="AccessNotGranted"
                        onPress={() => navigation.navigate("AccessNotGranted")}
                    />
                </View>
            ) : (
                <AccessNotGranted />
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
