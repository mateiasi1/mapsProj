import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";

const BackBetweenComponents = (navigation) => {
    return (
        <Pressable style={styles.button}>
            <Text style={styles.text}>Înapoi</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
    },
    text: {
        fontSize: 20,
        padding: 5,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "rgb(49,115,219)",
    },
});
export default BackBetweenComponents;
