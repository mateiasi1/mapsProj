import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faCheckDouble,
    faCircleExclamation,
    faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";

const CustomDrawer = (props) => {
    const { logout } = useContext(UserContext);
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: "#f4511e" }}
            >
                <ImageBackground
                    source={require("../../assets/userPictureBackground.png")}
                    style={{ padding: 20 }}
                >
                    <Image
                        source={require("../../assets/profilePicturePlaceholder.png")}
                        style={{
                            height: 80,
                            width: 80,
                            borderRadius: 40,
                            marginBottom: 10,
                        }}
                    />
                    <Text
                        style={{
                            color: "#fff",
                            fontSize: 18,
                            marginBottom: 5,
                        }}
                    >
                        John Doe
                    </Text>
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flexDirection: "row" }}>
                            <Text
                                style={{
                                    color: "#fff",
                                    marginRight: 5,
                                }}
                            >
                                12 Events
                            </Text>
                            <FontAwesomeIcon
                                icon={faCircleExclamation}
                                color={"#fff"}
                                size={14}
                            />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text
                                style={{
                                    color: "#fff",
                                    marginRight: 5,
                                }}
                            >
                                4 Done
                            </Text>
                            <FontAwesomeIcon
                                icon={faCheckDouble}
                                color={"#fff"}
                                size={14}
                            />
                        </View>
                    </View>
                </ImageBackground>
                <View
                    style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}
                >
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View
                style={{
                    padding: 20,
                    borderTopWidth: 1,
                    borderTopColor: "#ccc",
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        logout();
                    }}
                    style={{ paddingVertical: 15 }}
                >
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <FontAwesomeIcon
                            icon={faArrowRightFromBracket}
                            color={"#000"}
                            size={22}
                        />
                        <Text
                            style={{
                                fontSize: 15,
                                marginLeft: 5,
                            }}
                        >
                            Logout
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};
export default CustomDrawer;
