import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { FC, useState } from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    Pressable,
} from "react-native";
import { Button, Paragraph } from "react-native-paper";
import {
    faCar,
    faCarCrash,
    faCircle,
    faLightbulb,
    faLock,
    faRoad,
    faRoadCircleExclamation,
    faTrafficLight,
    faTriangleExclamation,
    IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import SubEvents from "./SubEvents";
import SubEvent from "../../models/SubEvent";
import Event from "../../models/Event";

const events = [
    {
        id: 1,
        title: "Pericol",
        icon: faTriangleExclamation,
        color: "black",
        subEvents: [
            {
                id: 1,
                title: "Pe drum",
                icon: faRoad,
                color: "black",
                subEventTypes: [
                    {
                        id: 1,
                        title: "Groapa periculoasa",
                        icon: faCircle,
                        color: "black",
                    },
                    {
                        id: 2,
                        title: "Semafor nefunctional",
                        icon: faTrafficLight,
                        color: "black",
                    },
                    {
                        id: 3,
                        title: "Bec ars",
                        icon: faLightbulb,
                        color: "black",
                    },
                ],
            },
            {
                id: 2,
                title: "Pe acostament",
                icon: faRoadCircleExclamation,
                color: "black",
                subEventTypes: [
                    {
                        id: 1,
                        title: "Indicator lipsa",
                        icon: faTriangleExclamation,
                        color: "black",
                    },
                ],
            },
            {
                id: 3,
                title: "Inca ceva",
                icon: faLightbulb,
                color: "black",
            },
        ],
    },
    {
        id: 2,
        title: "Car",
        icon: faCar,
        color: "black",
        subEvents: [
            {
                id: 1,
                title: "Sub event 1",
                icon: faCarCrash,
                color: "black",
            },
            { id: 2, title: "Sub event 2", icon: faCar, color: "black" },
        ],
    },
    {
        id: 3,
        title: "Car1",
        icon: faCar,
        color: "black",
        subEvents: [
            {
                id: 1,
                title: "Sub event 1",
                icon: faCarCrash,
                color: "black",
            },
            { id: 2, title: "Sub event 2", icon: faCar, color: "black" },
        ],
    },
    {
        id: 4,
        title: "Car1",
        icon: faCar,
        color: "black",
        subEvents: [
            {
                id: 1,
                title: "Sub event 1",
                icon: faCarCrash,
                color: "black",
            },
            { id: 2, title: "Sub event 2", icon: faCar, color: "black" },
        ],
    },
    {
        id: 5,
        title: "Car1",
        icon: faCar,
        color: "black",
        subEvents: [
            {
                id: 1,
                title: "Sub event 1",
                icon: faCarCrash,
                color: "black",
            },
            { id: 2, title: "Sub event 2", icon: faCar, color: "black" },
        ],
    },
    {
        id: 6,
        title: "Car1",
        icon: faCar,
        color: "black",
        subEvents: [
            {
                id: 1,
                title: "Sub event 1",
                icon: faCarCrash,
                color: "black",
            },
            { id: 2, title: "Sub event 2", icon: faCar, color: "black" },
        ],
    },
    {
        id: 7,
        title: "Car1",
        icon: faCar,
        color: "black",
        subEvents: [
            {
                id: 1,
                title: "Sub event 1",
                icon: faCarCrash,
                color: "black",
            },
            { id: 2, title: "Sub event 2", icon: faCar, color: "black" },
        ],
    },
] as Event[];
const EventsScreen = ({ route, navigation }) => {
    const [selectedEvent, setSelectedEvent] = useState<Event>(null);
    const [showSubEvents, setShowSubEvents] = useState<boolean>(false);
    const [selectedSubEvent, setSelectedSubEvent] = useState<SubEvent>(null);

    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        navigation.canGoBack = false;
    }, [navigation]);
    const handleShowSubEvents = () => {
        setShowSubEvents(!showSubEvents);
    };
    const handleSelectEvent = (event: Event) => {
        setSelectedEvent(event);
        handleShowSubEvents();
    };

    const handleSelectedSubEvent = (subEvent: SubEvent) => {
        if (selectedSubEvent === subEvent) {
            setSelectedSubEvent(null);
            setSelectedEvent(null);
            return;
        }
        setSelectedSubEvent(subEvent);
    };

    const onPress = () => {
        navigation.navigate("Map", { post: itemId });
    };

    const { itemId, otherParam } = route.params;

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "95%",
            }}
        >
            {/* <Text>itemId: {JSON.stringify(itemId)}</Text>
            <Text>otherParam: {JSON.stringify(otherParam)}</Text> */}

            {!showSubEvents && (
                <View style={styles.rootOptionsContent}>
                    {events.map((event) => (
                        <View
                            key={event.id}
                            style={{
                                width: "30%",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <TouchableOpacity
                                style={styles.iconBorder}
                                onPress={() => handleSelectEvent(event)}
                            >
                                <FontAwesomeIcon
                                    icon={event.icon}
                                    color={event.color}
                                    size={25}
                                    style={{
                                        padding: 20,
                                    }}
                                />
                                {/* <Text
                        style={{
                          marginLeft: 10,
                          color: "#fff",
                          fontWeight: "bold",
                        }}
                      >
                        Login With Facebook
                      </Text> */}
                            </TouchableOpacity>

                            <Paragraph>{event.title}</Paragraph>
                        </View>
                    ))}
                </View>
            )}
            {showSubEvents && (
                <View>
                    <SubEvents
                        event={selectedEvent}
                        onSelectSubEvent={handleSelectedSubEvent}
                    />
                </View>
            )}
            <View>
                <View
                    style={{
                        borderBottomColor: "black",
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />
                <Pressable style={styles.button} onPress={onPress}>
                    <Text style={styles.text}>Închide</Text>
                </Pressable>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    iconBorder: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        borderColor: "#f4511e",
        borderRadius: 10,
        borderWidth: 2,
        height: 70,
        padding: 13,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
    },
    text: {
        fontSize: 20,
        padding: 5,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "rgb(49,115,219)",
    },
    rootOptionsContent: {
        display: "flex",
        justifyContent: "space-between",
        padding: 20,
        flexDirection: "row",
        flexWrap: "wrap",
    },
});
export default EventsScreen;
