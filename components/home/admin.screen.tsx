import React, { useEffect, useState } from "react";
import { Button, View, StyleSheet, TouchableOpacity } from "react-native";
import { DataTable, TextInput } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EventDTO from "../../models/EventDto";
import {
    faAngleDown,
    faAnglesDown,
    faCarCrash,
} from "@fortawesome/free-solid-svg-icons";
import { EventPriority } from "../enum/EventPriority";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const AdminScreen = ({ navigation }) => {
    const [text, setText] = useState("");
    const optionsPerPage = [2, 3, 4];
    const [page, setPage] = React.useState<number>(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);
    const onEventSelect = (event: EventDTO) => {
        navigation.navigate("AdminEvent", {
            event: event,
        });
    };
    return (
        <View>
            <View style={styles.container}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={styles.row}>
                            Name
                        </DataTable.Title>
                        <DataTable.Title style={styles.row} numeric>
                            Latitude
                        </DataTable.Title>
                        <DataTable.Title style={styles.row} numeric>
                            Longitude
                        </DataTable.Title>
                        <DataTable.Title style={styles.row} numeric>
                            Priority
                        </DataTable.Title>
                        <DataTable.Title style={styles.row}>
                            Priority Icon
                        </DataTable.Title>
                        <DataTable.Title style={styles.row}>
                            Icon
                        </DataTable.Title>
                    </DataTable.Header>
                    {events.map((event) => (
                        <TouchableOpacity
                            key={event.id}
                            onPress={() => onEventSelect(event)}
                        >
                            <DataTable.Row>
                                <DataTable.Cell>{event.title}</DataTable.Cell>
                                <DataTable.Cell numeric>
                                    {event.location.latitude}
                                </DataTable.Cell>
                                <DataTable.Cell numeric>
                                    {event.location.longitude}
                                </DataTable.Cell>

                                <DataTable.Cell numeric>
                                    {event.priority}
                                </DataTable.Cell>
                                <DataTable.Cell>
                                    <FontAwesomeIcon
                                        icon={event.icon}
                                        color={event.color}
                                        size={30}
                                        style={{
                                            padding: 25,
                                            width: "20%",
                                        }}
                                    />
                                </DataTable.Cell>
                                <DataTable.Cell>
                                    {" "}
                                    <FontAwesomeIcon
                                        icon={event.subEvent.icon}
                                        color={event.subEvent.color}
                                        size={30}
                                        style={{
                                            padding: 25,
                                            width: "20%",
                                        }}
                                    />
                                </DataTable.Cell>
                            </DataTable.Row>
                        </TouchableOpacity>
                    ))}
                    <DataTable.Pagination
                        page={page}
                        numberOfPages={3}
                        onPageChange={(page) => setPage(page)}
                        label="1-2 of 6"
                        optionsPerPage={optionsPerPage}
                        itemsPerPage={itemsPerPage}
                        setItemsPerPage={setItemsPerPage}
                        showFastPagination
                        optionsLabel={"Rows per page"}
                    />
                </DataTable>
            </View>
            <KeyboardAwareScrollView>
                {/* <Text>Admin Screen</Text> */}

                <TextInput
                    label="Email"
                    value={text}
                    onChangeText={(text) => setText(text)}
                />
                <Button title="Go back" onPress={() => navigation.goBack()} />
            </KeyboardAwareScrollView>
        </View>
    );
};

const events = [
    {
        id: 1,
        title: "Car crash",
        icon: faAngleDown,
        color: "#1477d2",
        subEvent: {
            id: 1,
            title: "Sub event 1",
            icon: faCarCrash,
            color: "black",
        },
        location: {
            id: 1,
            latitude: 44.32751537449618,
            longitude: 23.800023458898067,
        },
        priority: EventPriority.Low,
    },
    {
        id: 2,
        title: "Car",
        icon: faAnglesDown,
        color: "#64b7f6",
        subEvent: {
            id: 1,
            title: "Sub event 1",
            icon: faCarCrash,
            color: "black",
        },
        location: {
            id: 1,
            latitude: 44.3275153744962,
            longitude: 23.80002345889807,
        },
        priority: EventPriority.Trivial,
    },
] as EventDTO[];

const styles = StyleSheet.create({
    container: {},
    row: {
        width: "15%",
    },
});
export default AdminScreen;
