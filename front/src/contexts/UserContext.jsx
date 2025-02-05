import { createContext, useState } from "react";

export const UserContext = createContext({
    user: {},
    setUser: () => {},
    userAppointments: [],
    setUserAppointments: () => {},
    refetchAppointments: () => {},
    setRefetchAppointments: () => {}
});

export const UserProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [userAppointments, setUserAppointments] = useState([]);
    const [refetchAppointments, setRefetchAppointments] = useState(() => () => {})

    const value = {
        user,
        setUser,
        userAppointments,
        setUserAppointments,
        refetchAppointments,
        setRefetchAppointments
    };

    return(
        <UserContext.Provider value={value} >{children}</UserContext.Provider>
    );
};