import { createContext, useState } from "react";

export const UserContext = createContext({
    user: {},
    setUser: () => {},
    userAppointments: [],
    setUserAppointments: () => {}
});

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [userAppointments, setUserAppointments] = useState([]);

    const value = {
        user,
        setUser,
        userAppointments,
        setUserAppointments
    };

    return(
        <UserContext.Provider value={value} >{children}</UserContext.Provider>
    );
};