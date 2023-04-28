import { createContext, useState } from "react";
import UserRoles from "../components/enum/UserRoles";
import User from "../models/User";
import { BE_API_URL } from "@env";
import { HttpStatusCode } from "axios";
import * as SecureStore from "expo-secure-store";

export const UserContext = createContext(null);

export const UserContextProvider = ({ navigation, children }) => {
    // const [user, setUser] = useState(null);

    const [user, setUser] = useState<User>(null);

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
            if (response.status === HttpStatusCode.Ok) {
                setUser(data.user);
                try {
                    await SecureStore.setItemAsync("_token", data.token);
                } catch (e) {
                    console.log(e);
                }
                return HttpStatusCode.Ok;
            }
            console.log("response.status " + response.status);
            return HttpStatusCode.Unauthorized;
        } catch (error) {
            console.error("Error:  " + error);
        }
    };
    const logout = async () => {
        await SecureStore.deleteItemAsync("_token");

        setUser(null);
        navigation.navigate("Login");
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
