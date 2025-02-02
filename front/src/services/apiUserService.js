import apiService from "./apiService";

export const getUsers = async () => {
    try {
        const response = await apiService.get("/users");
        return response.data;
    } catch (error) {
        throw Error(`Error requesting users: ${error.response.data.error}`);
    };
};

export const getUserById = async (id) => {
    try {
        const response = await apiService.get(`/users/${id}`);
        return response.data;
    } catch (error) {
        throw Error(`Error requesting user: ${error.response.data.error}`);
    };
};

export const createUser = async (user) => {
    try {
        const response = await apiService.post("/users/register", user);
        return response.data;
    } catch (error) {
        throw Error(`Error registering user: ${error.response.data.error}`);
    };
};

export const loginUser = async (credentials) => {
    try {
        const response = await apiService.post("/users/login", credentials);
        return response.data.user;
    } catch (error) {
        throw Error(`Error logging in the user: ${error.response.data.error}`);       
    }
}