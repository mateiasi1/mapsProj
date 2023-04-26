import {
    DrawerContentScrollView,
    DrawerItemList,
} from "@react-navigation/drawer";
import { View, Text, ImageBackground, Image } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
    faCheckDouble,
    faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";

const CustomDrawer = (props) => {
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
                            fontFamily: "Roboto-Medium",
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
                                    fontFamily: "Roboto-Regular",
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
                                    fontFamily: "Roboto-Regular",
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
            <View>
                <Text>Our Custom</Text>
            </View>
        </View>
    );
};
export default CustomDrawer;
