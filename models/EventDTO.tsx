import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { EventPriority } from "../components/enum/EventPriority";
import EventLocation from "./EventLocation";
import SubEvent from "./SubEvent";

type EventDTO = {
  id: number;
  title: string;
  icon: IconDefinition;
  color: string;
  subEvent: SubEvent;
  location: EventLocation;
  priority: EventPriority;
};
export default EventDTO;
