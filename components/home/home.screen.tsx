import React, { useContext, useEffect, useState } from "react";
import { Button, SafeAreaView, Text } from "react-native";
import { StyleSheet, View, Dimensions } from "react-native";

import * as Location from "expo-location";
import AccessNotGranted from "../localization/accessNotGranted";
import LoginScreen from "../login/login.screen";
import UserRoles from "../../models/UserRoles";
import { UserContext } from "../../contexts/userContext";

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
    //TODO: user will be provided by context
    // const user = {
    //     name: "Ionel",
    //     phoneNumber: "+40761559101",
    //     role: "Admin",
    // };

    const { user } = useContext(UserContext);

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
    if (!user) {
        navigation.navigate("Login");
    }
    if (!location) {
        return <AccessNotGranted />;
    }
    console.log("user.role: " + JSON.stringify(user));
    // if (user !== null) {
    //     switch (user.role) {
    //         case UserRoles.Labour:
    //             console.log("hit labour=> navigate to map");
    //             return navigation.navigate("Map");
    //         case UserRoles.Admin:
    //             console.log("hit admin=> navigate to admin");
    //             return navigation.navigate("Admin");
    //     }
    // }
};

export default HomeScreen;
