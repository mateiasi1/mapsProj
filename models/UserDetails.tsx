import User from "./User";

type UserDetails = {
    user: User;
    activeUntil: Date;
    token?: string;
};
export default UserDetails;
