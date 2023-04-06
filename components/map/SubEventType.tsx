import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { FC, useState } from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    Keyboard,
    Pressable,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Paragraph, Button, TextInput } from "react-native-paper";
import Event from "../../models/Event";
import SubEvent from "../../models/SubEvent";
type Props = {
    subEvent: SubEvent;
    navigation: any;
};

const SubEventType: FC<Props> = ({ subEvent, navigation }) => {
    //TODO: user will be provided by context
    const user = {
        name: "Ionel",
        phoneNumber: "+40761559101",
        role: "Labour",
    };
    const [description, setDescription] = useState("");

    const [selectedSubEventType, setSelectedSubEventType] = useState<number>();

    const addEventHandler = () => {
        //TODO:send to DB and there add a new object related to the parent event and also add it to markers
        //selectedSubEventType and description if exist
        //IMPORTANT: check on the be side if already exist an item with the same event,subevent in the same area(+10m) and if exist link the item to this user too and increase the priority to this event
        navigation.navigate("Map");
    };

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

            <View style={styles.descriptionBox}>
                <TextInput
                    label="Descriere"
                    value={description}
                    multiline={true}
                    numberOfLines={7}
                    onChangeText={(description) => setDescription(description)}
                    style={{ height: 200, textAlignVertical: "top" }}
                    disabled={user.role !== "PowerUser"}
                />
                {user.role !== "PowerUser" && (
                    <Text style={styles.infoDisabledText}>
                        ** The above field is disabled. In order to make it
                        enabled you should report correctly some issues!
                    </Text>
                )}
            </View>
            <View style={styles.addButtonBox}>
                <Pressable
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? "#d53b0a" : "#f4511e",
                        },
                        styles.addButton,
                    ]}
                    onPress={addEventHandler}
                >
                    <Text>Add event</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        display: "flex",
        flexDirection: "column",
    },
    descriptionBox: {
        padding: 15,
    },
    infoDisabledText: {
        color: "#808080",
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
    addButton: {
        alignItems: "center",
        padding: 10,
        color: "#ffff",
        width: "90%",
        borderRadius: 10,
    },
    addButtonBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 10,
    },
});
export default SubEventType;
