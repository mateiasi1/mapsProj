import { useState } from "react";
import { Button, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { API_KEY, Messaging_Service_Sid_Twilio } from "@env";

const LoginScreenContent = ({ navigation }) => {
    const Buffer = require("buffer").Buffer;
    const buffer = Buffer.from(API_KEY).toString("base64");
    const [OTPCode, setOTPCode] = useState<number>();
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [verificationCode, setVerificationCode] = useState<string>();
    const onButtonClick = () => {
        const newlyCreatedOTP = Math.floor(Math.random() * 900000) + 100000;

        setOTPCode(newlyCreatedOTP);
        fetch(
            "https://api.twilio.com/2010-04-01/Accounts/AC3e92b22ecef83fd2f6fedc27993e2dd9/Messages.json",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${buffer}`,
                },
                body: `To=+40761559101&From=+15677496610&Body=Your CityZen authentication code:${newlyCreatedOTP}&MessagingServiceSid=${Messaging_Service_Sid_Twilio}`,
            }
        )
            .then((response) => {
                // handle response
                console.log("yay" + response.status);
            })
            .catch((error) => {
                // handle error
                console.log("meh");
            });
    };
    const verifyOTP = () => {
        console.log("verificationCode: " + verificationCode);
        console.log("OTPCode: " + OTPCode);
        if (Number(verificationCode) === OTPCode) {
            console.log("verificat");
            navigation.navigate("Home");
        }
    };

    return (
        <View>
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
