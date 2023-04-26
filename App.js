import * as React from "react";
import HomeScreen from "./components/home/home.screen";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AdminScreen from "./components/home/admin.screen";
import EventsScreen from "./components/home/EventsScreen";
import MapScreen from "./components/map/map.screen";
import AdminEvent from "./components/adminEvent/admin.event.screen";
import AccessNotGranted from "./components/localization/accessNotGranted";
import LoginScreen from "./components/login/login.screen";
import { UserContextProvider } from "./contexts/userContext";
import UserScreen from "./components/user/user.screen";
import CustomDrawer from "./components/sideBar/customDrawer";

export default function App() {
    const Drawer = createDrawerNavigator();
    return (
        <UserContextProvider>
            <NavigationContainer>
                <Drawer.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: "#f4511e",
                        },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                    drawerContent={(props) => <CustomDrawer {...props} />}
                >
                    <Drawer.Screen
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
                    <Drawer.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{
                            title: "Login",
                            headerShown: false,
                            drawerItemStyle: { display: "none" },
                        }}
                    />
                    <Drawer.Screen
                        name="Admin"
                        component={AdminScreen}
                        options={{
                            title: "Admin",
                            headerLeft: () => <Button title="" />,
                            drawerItemStyle: { display: "none" },
                        }}
                    />
                    <Drawer.Screen
                        name="AccessNotGranted"
                        component={AccessNotGranted}
                        options={{
                            title: "AccessNotGranted",
                            drawerItemStyle: { display: "none" },
                        }}
                    />
                    <Drawer.Screen
                        name="Events"
                        component={EventsScreen}
                        options={{
                            title: "Events",
                        }}
                    />
                    <Drawer.Screen
                        name="User"
                        component={UserScreen}
                        options={{
                            title: "User",
                        }}
                    />
                    <Drawer.Screen
                        name="Map"
                        component={MapScreen}
                        options={{
                            title: "Map",
                        }}
                    />
                    <Drawer.Screen
                        name="AdminEvent"
                        component={AdminEvent}
                        options={{
                            title: "Admin Event",
                            drawerItemStyle: { display: "none" },
                        }}
                    />
                </Drawer.Navigator>
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
