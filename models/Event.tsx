import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import SubEvent from "./SubEvent";

type Event = {
  id: number;
  title: string;
  icon: IconDefinition;
  color: string;
  subEvents: SubEvent[];
};
export default Event;
