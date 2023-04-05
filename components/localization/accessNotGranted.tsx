import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import EventDTO from "../../models/EventDto";
import {
    faLocationCrosshairs,
    faLocationArrow,
    faSquareCheck,
    faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const AccessNotGranted = () => {
    const [text, setText] = useState("");
    const [eventDtos, setEventDtos] = useState<EventDTO[]>([]);
    const optionsPerPage = [2, 3, 4];
    const [page, setPage] = React.useState<number>(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
    const user = {
        name: "Ionel",
        phoneNumber: "+40761559101",
        role: "Labour",
    };
    return (
        <View style={{ display: "flex", alignItems: "center", padding: "5%" }}>
            <FontAwesomeIcon
                icon={faMapLocationDot}
                color={"black"}
                size={30}
                style={{
                    padding: 25,
                    width: "20%",
                }}
            />
            <Text>
                CityZen are nevoie de locatia ta exacta pentru a-ti oferii
                indicatii de orientare pas cu pas si pentru a putea adauga
                evenimente cat mai precis. NU VOM FOLOSII LOCATIA TA CU ALTE
                SCOPURI SAU NU O VOM IMPARTASII CU TERTE PARTI!
            </Text>
            <Text style={{ fontWeight: "bold", marginTop: "5%" }}>
                Acceseaza setarile, dupa care:
            </Text>
            <View>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: "5%",
                    }}
                >
                    <Text style={{ marginRight: "2%" }}>1.</Text>
                    <FontAwesomeIcon
                        icon={faLocationArrow}
                        color={"black"}
                        style={{
                            padding: 20,
                        }}
                    />
                    <Text style={{ marginLeft: "2%" }}>Selecteaza locatia</Text>
                </View>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: "5%",
                    }}
                >
                    <Text style={{ marginRight: "2%" }}>2.</Text>
                    <FontAwesomeIcon
                        icon={faSquareCheck}
                        color={"black"}
                        style={{
                            padding: 20,
                        }}
                    />
                    <Text style={{ marginLeft: "2%" }}>
                        Atinge Intotdeauna sau La utilizare
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default AccessNotGranted;
