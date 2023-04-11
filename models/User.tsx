import UserRoles from "./UserRoles";

type User = {
    name: string;
    phoneNumber: string;
    role: UserRoles;
    token?: string;
    activeUntil?: Date;
};

export default User;
