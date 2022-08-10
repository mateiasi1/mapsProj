import { text } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { FC, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Paragraph, Button, TextInput } from "react-native-paper";
import Event from "../../models/Event";
import SubEvent from "../../models/SubEvent";
type Props = {
  event: Event;
  onSelectSubEvent: (subEvent: SubEvent) => void;
};

const SubEvents: FC<Props> = ({ event, onSelectSubEvent }) => {
  debugger;
  const [text, setText] = useState("");
  return (
    <View style={styles.subEventIcons}>
      {event &&
        event.subEvents !== null &&
        event.subEvents !== undefined &&
        event.subEvents.map((subEvent) => (
          <KeyboardAwareScrollView
            key={subEvent.id}
            style={{
              display: "flex",
              width: 80,
            }}
          >
            <TouchableOpacity
              style={styles.iconBorder}
              onPress={() => onSelectSubEvent(subEvent)}
            >
              <FontAwesomeIcon
                icon={subEvent.icon}
                color={subEvent.color}
                size={50}
              />
            </TouchableOpacity>
            <Paragraph>{subEvent.title}</Paragraph>
            {/* <View style={event !== null ? styles.doNotHide : styles.hideZone}> */}
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
          </KeyboardAwareScrollView>
        ))}
    </View>
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
    width: 80,
  },
  subEventIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  hideZone: {
    display: "none",
  },
  doNotHide: { display: "flex", flexDirection: "column" },
});
export default SubEvents;
