import { useContext, useEffect, useState } from "react";
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    Alert,
    Button,
} from "react-native";
import { TextInput } from "react-native-paper";
import { JWT_KEY, BE_API_URL } from "@env";
import { UserContext } from "../../contexts/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { HttpStatusCode } from "axios";
import jwtDecode from "jwt-decode";
import * as SecureStore from "expo-secure-store";
const LoginScreenContent = ({ navigation }) => {
    const Buffer = require("buffer").Buffer;
    const [OTPCode, setOTPCode] = useState<number>();
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [verificationCode, setVerificationCode] = useState<string>();
    const { user, setUser, login, logout } = useContext(UserContext);
    const [isPhoneSet, setIsPhoneSet] = useState<boolean>(false);

    const handleGetToken = async () => {
        const tokenFromPersistentState = await SecureStore.getItemAsync(
            "@token"
        );
        if (tokenFromPersistentState) {
            Alert.alert(
                "This token is stored on your device, isn't that cool!:",
                tokenFromPersistentState
            );
        }
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const token = await SecureStore.getItemAsync("_token");

                if (token !== null) {
                    var decoded = jwtDecode(token);
                    const expirationDate = new Date(decoded.exp);
                    if (expirationDate.getDate() > new Date().getDate()) {
                        await SecureStore.deleteItemAsync("@token");
                        logout();
                        return;
                    }
                    fetch(`${BE_API_URL}/api/Auth/getUser`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    })
                        .then(async (response) => {
                            // handle response
                            const data = await response.json();
                            setUser(data);
                        })
                        .catch((error) => {
                            // handle error
                            console.log("meh " + error);
                        });

                    navigation.navigate("Home");
                }
            } catch (e) {
                // error reading value
            }
        };
        getData();
    }, []);

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
            })
            .catch((error) => {
                // handle error
            });
    };
    const verifyOTP = async () => {
        const loginStatus = login(phoneNumber, verificationCode);
        console.log("loginStatus " + loginStatus);
        if (user) {
            navigation.navigate("Home");
        }
        if (loginStatus === HttpStatusCode.Unauthorized) {
            // TODO://add mesaj de trimite incearca din nou codul, la 3 greseli primesti altul dupa 5 min
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
            <Button title="get token" onPress={handleGetToken} />
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
