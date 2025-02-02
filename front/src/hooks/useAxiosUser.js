import { useState, useEffect } from 'react';
import { getUsers, getUserById, createUser, loginUser } from '../services/apiUserService';

const useAxiosUser = (endpoint, toSend = null) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
            const fetchData = async () => {
                switch(endpoint) {
                    case "users":
                        try {
                            const users = await getUsers();
                            setData(users);
                        } catch (error) {
                            setError(error);
                        };
                        break;
                    case "user id":
                        try {
                            const user = await getUserById(toSend);
                            setData(user);
                        } catch (error) {
                            setError(error);
                        };
                        break;
                    case "register":
                        try {
                            const user = await createUser(toSend);
                            setData(user.data);
                        } catch (error) {
                            setError(error);
                        };
                        break;
                    case "login":
                        try {
                            const user = await loginUser(toSend);
                            setData(user);
                        } catch (error) {
                            setError(error);
                        };
                        break;
            };           
        };

        fetchData();
    }, [endpoint]);

    return { data, error };
};

export default useAxiosUser;