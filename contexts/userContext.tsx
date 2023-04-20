import { createContext, useState } from "react";
import UserRoles from "../models/UserRoles";
import User from "../models/User";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
    // const [user, setUser] = useState(null);

    const [user, setUser] = useState<User>();
    //     {
    //     name: "Ionel",
    //     phoneNumber: "+40761559101",
    //     role: UserRoles.Admin,
    //     token: null,
    //     activeUntil: new Date("2023-05-01T00:00:00Z"),
    // }
    // const [user, setUser] = useState<User>(null);
    const login = () => {
        fetch("/login").then((res) => {
            //setUser(res.user);
        });
    };
    const logout = () => {
        fetch("/logout").then((res) => {
            setUser(null);
        });
    };

    const value = {
        user,
        setUser,
        login,
        logout,
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
