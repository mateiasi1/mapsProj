import React, { FC, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import {
  FAB,
  Button,
  Paragraph,
  Dialog,
  Portal,
  Provider,
} from "react-native-paper";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCar, faCarCrash } from "@fortawesome/free-solid-svg-icons";
import Event from "../../models/Event";
import { TextInput } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Text, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = {
  visible: boolean;
  events: Event[];
  hideDialog: () => void;
};
const EventPickerDialog: FC<Props> = ({ visible, events, hideDialog }) => {
  const [text, setText] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event>(null);
  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
  };

  return (
    <Provider>
      <KeyboardAwareScrollView>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Pick an event</Dialog.Title>
            <Dialog.Content>
              <View style={styles.rootOptionsContent}>
                {events.map((event) => (
                  <View key={event.id}>
                    <TouchableOpacity
                      style={styles.iconBorder}
                      onPress={() => handleSelectEvent(event)}
                    >
                      <FontAwesomeIcon
                        icon={event.icon}
                        color={event.color}
                        size={30}
                        style={{
                          padding: 25,
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
              <View style={styles.hr}></View>
              <KeyboardAwareScrollView
                style={{ display: "flex", flexDirection: "column" }}
              >
                <View
                  style={selectedEvent ? styles.doNotHide : styles.hideZone}
                >
                  <View style={styles.subEventIcons}>
                    {selectedEvent &&
                      selectedEvent.subEvents !== null &&
                      selectedEvent.subEvents !== undefined &&
                      selectedEvent.subEvents.map((subEvent) => (
                        <View
                          key={subEvent.id}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: 80,
                          }}
                        >
                          <TouchableOpacity
                            style={styles.iconBorder}
                            onPress={() => handleSelectEvent(selectedEvent)}
                          >
                            <FontAwesomeIcon
                              icon={subEvent.icon}
                              color={subEvent.color}
                              size={50}
                            />
                          </TouchableOpacity>
                          <Paragraph>{subEvent.title}</Paragraph>
                        </View>
                      ))}
                  </View>

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
                  <Button onPress={hideDialog}>Done</Button>
                </View>
              </KeyboardAwareScrollView>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </KeyboardAwareScrollView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  iconBorder: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "blue",
    borderRadius: 50,
    borderWidth: 2,
    height: 80,
    padding: 13,
  },
  hideZone: {
    display: "none",
  },
  doNotHide: { display: "flex", flexDirection: "column" },
  subEventIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rootOptionsContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  hr: {
    margin: 20,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
export default EventPickerDialog;
