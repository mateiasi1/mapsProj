import React, { useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const DetailsScreen = ({ navigation }) => {
  const [text, setText] = useState("");
  return (
    <KeyboardAwareScrollView>
      <Text>Details Screen</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
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
    </KeyboardAwareScrollView>
  );
};

export default DetailsScreen;
