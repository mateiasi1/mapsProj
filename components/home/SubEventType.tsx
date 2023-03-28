import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { FC, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Paragraph, Button, TextInput } from "react-native-paper";
import Event from "../../models/Event";
import SubEvent from "../../models/SubEvent";
type Props = {
    subEvent: SubEvent;
};

const SubEventType: FC<Props> = ({ subEvent }) => {
    const [text, setText] = useState("");
    const [selectedSubEventType, setSelectedSubEventType] = useState<number>();
    return (
        <View style={styles.root}>
            <View style={styles.iconsView}>
                {subEvent &&
                    subEvent !== null &&
                    subEvent !== undefined &&
                    subEvent.subEventTypes.map((subEventType) => (
                        <View
                            style={[
                                styles.itemView,
                                selectedSubEventType === subEventType.id &&
                                    styles.selectedSubEventType,
                            ]}
                            key={subEventType.id}
                        >
                            <TouchableOpacity
                                onPress={() =>
                                    setSelectedSubEventType(subEventType.id)
                                }
                                // onPress={() => onSelectSubEvent(subEvent)}
                            >
                                <FontAwesomeIcon
                                    icon={subEventType.icon}
                                    color={subEventType.color}
                                    size={50}
                                />
                            </TouchableOpacity>
                            <Paragraph style={styles.eventTitle}>
                                {subEventType.title}
                            </Paragraph>
                        </View>
                    ))}
            </View>
            <View>
                <TextInput
                    label="Email"
                    value={text}
                    onChangeText={(text) => setText(text)}
                />
                <TextInput
                    label="Email"
                    value={text}
                    onChangeText={(text) => setText(text)}
                />
                <TextInput
                    label="Email"
                    value={text}
                    onChangeText={(text) => setText(text)}
                />
            </View>
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
        height: 110,
        padding: 5,
    },
    eventTitle: {
        maxWidth: 100,
        textAlign: "center",
    },
    selectedSubEventType: {
        borderWidth: 2,
        borderColor: "#f4511e",

        borderRadius: 10,
    },
    hideZone: {
        display: "none",
    },
    doNotHide: { display: "flex", flexDirection: "column" },
});
export default SubEventType;
