import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React, { FC, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Paragraph } from "react-native-paper";
import {
  faCar,
  faCarCrash,
  faLock,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import SubEvents from "./SubEvents";
import SubEvent from "../../models/SubEvent";
import Event from "../../models/Event";

const events = [
  {
    id: 1,
    title: "Car crash",
    icon: faCarCrash,
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
  { id: 2, title: "Car", icon: faCar, color: "black" },
  { id: 3, title: "Car1", icon: faCar, color: "black" },
  { id: 3, title: "Car1", icon: faCar, color: "black" },
  { id: 3, title: "Car1", icon: faCar, color: "black" },
  { id: 3, title: "Car1", icon: faCar, color: "black" },
  { id: 3, title: "Car1", icon: faCar, color: "black" },
] as Event[];
const EventsScreen = ({ navigation }) => {
  const [selectedEvent, setSelectedEvent] = useState<Event>(null);
  const [showSubEvents, setShowSubEvents] = useState<boolean>(false);
  const [selectedSubEvent, setSelectedSubEvent] = useState<SubEvent>(null);

  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    handleShowSubEvents();
  };
  const handleShowSubEvents = () => {
    setShowSubEvents(!showSubEvents);
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
    <View>
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
    borderRadius: 40,
    borderWidth: 2,
    height: 70,
    padding: 13,
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
