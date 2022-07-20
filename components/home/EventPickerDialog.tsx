import React, { FC, useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
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

type Props = {
  visible: boolean;
  hideDialog: () => void;
};
const EventPickerDialog: FC<Props> = ({ visible, hideDialog }) => {
  const getOptionsFromAPI = [
    {
      id: 1,
      title: "Car crash",
      icon: faCarCrash,
      color: "black",
    },
    { id: 2, title: "Car", icon: faCar, color: "black" },
  ];
  return (
    <Provider>
      <View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Pick an event</Dialog.Title>
            <Dialog.Content style={styles.rootOptionsContent}>
              {getOptionsFromAPI.map((option) => (
                <View key={option.id}>
                  <View style={styles.iconBorder}>
                    <FontAwesomeIcon
                      icon={option.icon}
                      size={40}
                      color={option.color}
                    />
                  </View>
                  <Paragraph>{option.title}</Paragraph>
                </View>
              ))}
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  iconBorder: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "red",
    borderColor: "blue",
    borderRadius: 50,
    width: 60,
    padding: 10,
  },
  rootOptionsContent: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default EventPickerDialog;
