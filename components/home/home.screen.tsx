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

const HomeScreen = ({ navigation }) => {
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

    return (
        <SafeAreaView style={styles.container}>
            {location ? (
                <View style={styles.search}>
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
