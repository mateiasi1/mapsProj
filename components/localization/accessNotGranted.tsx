import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import EventDTO from "../../models/EventDto";
import {
  faLocationCrosshairs,
  faLocationArrow,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const AccessNotGranted = () => {
  const [text, setText] = useState("");
  const [eventDtos, setEventDtos] = useState<EventDTO[]>([]);
  const optionsPerPage = [2, 3, 4];
  const [page, setPage] = React.useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  return (
    <View>
      <FontAwesomeIcon
        icon={faLocationCrosshairs}
        color={"black"}
        size={30}
        style={{
          padding: 25,
          width: "20%",
        }}
      />
      <Text>
        CityZen are nevoie de locatia ta exacta pentru a-ti oferii indicatii de
        orientare pas cu pas si pentru a putea adauga evenimente cat mai precis.
      </Text>
      <Text>Acceseaza setarile, dupa care</Text>
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <FontAwesomeIcon
          icon={faLocationArrow}
          color={"black"}
          size={30}
          style={{
            padding: 25,
            width: "20%",
          }}
        />
        <Text>Selecteaza locatia</Text>
      </View>
      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <FontAwesomeIcon
          icon={faSquareCheck}
          color={"black"}
          size={30}
          style={{
            padding: 25,
            width: "20%",
          }}
        />
        <Text>Atinge Intotdeauna sau La utilizare</Text>
      </View>
    </View>
  );
};

export default AccessNotGranted;
