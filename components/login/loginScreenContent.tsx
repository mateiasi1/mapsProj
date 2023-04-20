import { useContext, useState } from "react";
import { Button, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { API_KEY, BE_API_URL } from "@env";
import { UserContext } from "../../contexts/userContext";

const LoginScreenContent = ({ navigation }) => {
    const Buffer = require("buffer").Buffer;
    const buffer = Buffer.from(API_KEY).toString("base64");
    const [OTPCode, setOTPCode] = useState<number>();
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [verificationCode, setVerificationCode] = useState<string>();

    const { setUser, login } = useContext(UserContext);

    const onButtonClick = () => {
        const newlyCreatedOTP = Math.floor(Math.random() * 900000) + 100000;

        setOTPCode(newlyCreatedOTP);
        fetch(`${BE_API_URL}/api/Auth/SendVerificationMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                phoneNumber: "+40761559101",
                verificationCode: 0,
            }),
        })
            .then((response) => {
                // handle response
                console.log("yay" + response.status);
            })
            .catch((error) => {
                // handle error
                console.log("meh " + error);
            });
    };
    const verifyOTP = () => {
        console.log("verificationCode: " + verificationCode);
        console.log("OTPCode: " + OTPCode);
        if (Number(verificationCode) === OTPCode) {
            console.log("verificat");
            login();
            navigation.navigate("Home");
        }
    };

    return (
        <View style={styles.root}>
            <TextInput
                label="Phone number"
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
                onFocus={onButtonClick}
            />
            <TextInput
                label="Verification code"
                keyboardType="numeric"
                maxLength={6}
                onBlur={verifyOTP}
                onChangeText={(text) => setVerificationCode(text)}
            />
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={verifyOTP}
                    // onPress={() => onSelectSubEvent(subEvent)}
                >
                    <Text>Verify code</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    root: {
        marginTop: 50,
    },
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    button: {
        width: "80%",
        alignItems: "center",
        backgroundColor: "#f4511e",
        padding: 10,
        marginTop: 10,
    },
});
export default LoginScreenContent;
