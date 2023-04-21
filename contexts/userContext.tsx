import { createContext, useState } from "react";
import UserRoles from "../models/UserRoles";
import User from "../models/User";
import { BE_API_URL } from "@env";
import { HttpStatusCode } from "axios";

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
    const login = async (phoneNumber: string, verificationCode: string) => {
        try {
            const response = await fetch(`${BE_API_URL}/api/Auth/Login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phoneNumber: phoneNumber,
                    verificationCode: verificationCode,
                }),
            });
            const data = await response.json();

            console.log("status" + response.status);
            if (response.status === HttpStatusCode.Ok) {
                setUser(data.user);
                return response.status;
            }
        } catch (error) {
            console.error("Error:  " + error);
        }
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
