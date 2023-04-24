import UserRoles from "../components/enum/UserRoles";

type User = {
    name: string;
    phoneNumber: string;
    userRole: UserRoles;
};

export default User;
