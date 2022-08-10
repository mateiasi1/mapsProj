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
import EventsScreen from "./EventsScreen";
import SubEvents from "./SubEvents";
import SubEvent from "../../models/SubEvent";

type Props = {
  visible: boolean;
  events: Event[];
  hideDialog: () => void;
};
const EventPickerDialog: FC<Props> = ({ visible, events, hideDialog }) => {
  const [text, setText] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event>(null);
  const [selectedSubEvent, setSelectedSubEvent] = useState<SubEvent>(null);

  const handleSelectedEvent = (event: Event) => {
    setSelectedEvent(event);
  };
  const handleSelectedSubEvent = (subEvent: SubEvent) => {
    if (selectedSubEvent === subEvent) {
      setSelectedSubEvent(null);
      setSelectedEvent(null);
      return;
    }
    setSelectedSubEvent(subEvent);
  };

  return (
    <Provider>
      <KeyboardAwareScrollView>
        <KeyboardAwareScrollView
          style={{ display: "flex", flexDirection: "column" }}
        >
          {!selectedSubEvent && !selectedEvent && (
            <EventsScreen events={events} onSelectEvent={handleSelectedEvent} />
          )}
          {/* <View style={styles.hr}></View> */}
          {selectedEvent && (
            <SubEvents
              event={selectedEvent}
              onSelectSubEvent={handleSelectedSubEvent}
            />
          )}
        </KeyboardAwareScrollView>
      </KeyboardAwareScrollView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  hideZone: {
    display: "none",
  },
  doNotHide: { display: "flex", flexDirection: "column" },

  hr: {
    margin: 20,
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
export default EventPickerDialog;
