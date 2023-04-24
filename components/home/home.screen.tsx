import React, { useContext, useEffect, useState } from "react";
import { Button, SafeAreaView, Text } from "react-native";
import { StyleSheet, View, Dimensions } from "react-native";

import * as Location from "expo-location";
import AccessNotGranted from "../localization/accessNotGranted";
import LoginScreen from "../login/login.screen";
import UserRoles from "../enum/UserRoles";
import { UserContext } from "../../contexts/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
    const { user } = useContext(UserContext);

    useEffect(async () => {
        await AsyncStorage.removeItem("@token");
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
    if (!user) {
        navigation.navigate("Login");
    }
    if (!location) {
        return <AccessNotGranted />;
    }
    if (user !== null && user !== undefined) {
        switch (user.userRole) {
            case UserRoles.Labour:
                return navigation.navigate("Map");
            case UserRoles.User:
                return navigation.navigate("Map");
            case UserRoles.Admin:
                return navigation.navigate("Admin");
        }
    }
};

export default HomeScreen;
