import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import SubEventType from "./SubEventType";

type SubEvent = {
    id: number;
    title: string;
    icon: IconDefinition;
    color: string;
    subEventTypes: SubEventType[];
};
export default SubEvent;
