import * as React from "react";
import HomeScreen from "./components/home/home.screen";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminScreen from "./components/home/admin.screen";
import EventsScreen from "./components/home/EventsScreen";
import MapScreen from "./components/map/map.screen";
import AdminEvent from "./components/adminEvent/admin.event.screen";
import AccessNotGranted from "./components/localization/accessNotGranted";
import LoginScreen from "./components/login/login.screen";
import { UserContextProvider } from "./contexts/userContext";

export default function App() {
    const Stack = createNativeStackNavigator();
    return (
        <UserContextProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: "#f4511e",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                >
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{
                            title: "Home",
                            headerRight: () => (
                                <Button
                                    onPress={() => alert("This is a button!")}
                                    title="Info"
                                    color="#fff"
                                />
                            ),
                        }}

                        //  {(props) => <HomeScreen {...props} extraData={someData} />}  PASSING OTHER PROPS
                    />
                    <Stack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{
                            title: "Login",
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="Admin"
                        component={AdminScreen}
                        options={{
                            title: "Admin",
                            headerLeft: () => <Button title="" />,
                        }}
                    />
                    <Stack.Screen
                        name="AccessNotGranted"
                        component={AccessNotGranted}
                        options={{
                            title: "AccessNotGranted",
                        }}
                    />
                    <Stack.Screen
                        name="Events"
                        component={EventsScreen}
                        options={{
                            title: "Events",
                        }}
                    />
                    <Stack.Screen
                        name="Map"
                        component={MapScreen}
                        options={{
                            title: "Map",
                        }}
                    />
                    <Stack.Screen
                        name="AdminEvent"
                        component={AdminEvent}
                        options={{
                            title: "Admin Event",
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </UserContextProvider>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
