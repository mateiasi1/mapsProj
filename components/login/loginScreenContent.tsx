import { useState } from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { API_KEY } from "@env";
const LoginScreenContent = () => {
    const Buffer = require("buffer").Buffer;
    const buffer = Buffer.from(API_KEY).toString("base64");
    const onButtonClick = () => {
        fetch(
            "https://api.twilio.com/2010-04-01/Accounts/AC3e92b22ecef83fd2f6fedc27993e2dd9/Messages.json",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Basic ${buffer}`,
                },
                body: "To=+40761559101&From=+15677496610&Body=TEST OTP SENDING&MessagingServiceSid=MGac809e50174b581b00b9940d41d84206",
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
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    return (
        <View>
            <TextInput
                label="Phone number"
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
            />
            <TextInput
                label="Verification code"
                value={phoneNumber}
                onFocus={onButtonClick}
                onChangeText={(text) => setPhoneNumber(text)}
            />
        </View>
    );
};
export default LoginScreenContent;
