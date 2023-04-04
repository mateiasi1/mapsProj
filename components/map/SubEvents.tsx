import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { FC, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Paragraph, Button, TextInput } from "react-native-paper";
import Event from "../../models/Event";
import SubEvent from "../../models/SubEvent";
import SubEventType from "./SubEventType";
type Props = {
    event: Event;
    onSelectSubEvent: (subEvent: SubEvent) => void;
};

const SubEvents: FC<Props> = ({ event, onSelectSubEvent }) => {
    const [selectedSubEvent, setSelectedSubEvent] = useState<SubEvent>(null);
    const [showSubEventTypes, setShowSubEventTypes] = useState<boolean>(false);

    const handleShowSubEvents = () => {
        setShowSubEventTypes(!showSubEventTypes);
    };
    const handleSelectSubEvent = (subEvent: SubEvent) => {
        setSelectedSubEvent(subEvent);
        handleShowSubEvents();
    };

    return (
        <View style={styles.root}>
            {!showSubEventTypes ? (
                <View style={styles.iconsView}>
                    {event &&
                        event.subEvents !== null &&
                        event.subEvents !== undefined &&
                        event.subEvents.map((subEvent) => (
                            <View style={styles.itemView}>
                                <TouchableOpacity
                                    onPress={() =>
                                        handleSelectSubEvent(subEvent)
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={subEvent.icon}
                                        color={subEvent.color}
                                        size={50}
                                    />
                                </TouchableOpacity>
                                <Paragraph style={styles.eventTitle}>
                                    {subEvent.title}
                                </Paragraph>
                            </View>
                        ))}
                </View>
            ) : (
                <SubEventType subEvent={selectedSubEvent} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        display: "flex",
        flexDirection: "column",
    },
    iconsView: {
        display: "flex",
        flexDirection: "row",
        padding: "2%",
        justifyContent: "space-between",
    },
    itemView: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        width: 100,
    },
    eventTitle: {
        maxWidth: 100,
        textAlign: "center",
    },

    hideZone: {
        display: "none",
    },
    doNotHide: { display: "flex", flexDirection: "column" },
});
export default SubEvents;
