import { useContext, useState } from "react";
import { Button, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { API_KEY, BE_API_URL } from "@env";
import { UserContext } from "../../contexts/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { HttpStatusCode } from "axios";

const LoginScreenContent = ({ navigation }) => {
    const Buffer = require("buffer").Buffer;
    const buffer = Buffer.from(API_KEY).toString("base64");
    const [OTPCode, setOTPCode] = useState<number>();
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [verificationCode, setVerificationCode] = useState<string>();
    const { setUser, login } = useContext(UserContext);
    const [isPhoneSet, setIsPhoneSet] = useState<boolean>(false);
    const onButtonClick = () => {
        if (!phoneNumber) {
            return;
        }
        setIsPhoneSet(true);
        const newlyCreatedOTP = Math.floor(Math.random() * 900000) + 100000;

        setOTPCode(newlyCreatedOTP);
        fetch(`${BE_API_URL}/api/Auth/SendVerificationMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                phoneNumber: phoneNumber,
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
    const verifyOTP = async () => {
        try {
            const response = await fetch(`${BE_API_URL}/api/Auth/Login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phoneNumber: phoneNumber,
                    verificationCode: verificationCode,
                }),
            });
            // const data = await response.json();
            console.log(response);
            if (response.status === HttpStatusCode.Accepted) login();
            navigation.navigate("Home");
        } catch (error) {
            console.error("Error:  " + error);
        }
    };

    return (
        <View style={styles.root}>
            <View style={styles.phoneNumber}>
                <TextInput
                    label="Phone number"
                    value={phoneNumber}
                    onChangeText={(text) => setPhoneNumber(text)}
                    disabled={isPhoneSet}
                    style={{ width: isPhoneSet ? "90%" : "100%" }}
                />
                {isPhoneSet && (
                    <View
                        style={{
                            width: "10%",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        <TouchableOpacity onPress={() => setIsPhoneSet(false)}>
                            <FontAwesomeIcon icon={faPen} size={25} />
                        </TouchableOpacity>
                    </View>
                )}
            </View>
            {!isPhoneSet && (
                <Text style={styles.mandatoryField}>
                    * This field is mandatory
                </Text>
            )}
            <View style={styles.container}>
                {isPhoneSet ? (
                    <View style={styles.verification}>
                        <TextInput
                            label="Verification code"
                            keyboardType="numeric"
                            maxLength={6}
                            onBlur={verifyOTP}
                            onChangeText={(text) => setVerificationCode(text)}
                            style={styles.field}
                        />
                        <TouchableOpacity
                            style={styles.button}
                            onPress={verifyOTP}
                            // onPress={() => onSelectSubEvent(subEvent)}
                        >
                            <Text>Verify code</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onButtonClick}
                        // onPress={() => onSelectSubEvent(subEvent)}
                    >
                        <Text>Send code</Text>
                    </TouchableOpacity>
                )}
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
    mandatoryField: {
        color: "#ff0033",
        padding: 10,
        paddingBottom: 0,
    },
    field: {
        width: "100%",
    },
    verification: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    phoneNumber: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
});
export default LoginScreenContent;
