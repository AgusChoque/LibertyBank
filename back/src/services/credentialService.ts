import CredentialDto from "../dto/CredentialDto";
import ICredential from "../interfaces/ICredential";

//Array of ICredential to use as "preload".
const credentials: ICredential[] = [];

const credential1: ICredential = {
    id: 1,
    username: "juanperez",
    password: "ClaveSegura123"
};

const credential2: ICredential = {
    id: 2,
    username: "admin_test",
    password: "PassAdmin789"
};

credentials.push(credential1);
credentials.push(credential2);

let id = 3

//Create a new credential and return id.
export const setCredentialService = async ({username, password}: CredentialDto): Promise<number> => {
    const newCredential: ICredential = {
        id: id,
        username,
        password
    };

    credentials.push(newCredential);
    id++;
    return newCredential.id;
};

//Validate if username and password exist. In that case return id.
export const validateCredentialService = async ({username, password}: CredentialDto): Promise<number>=> {
    const credentialFinded:ICredential | undefined = credentials.find((credential:ICredential):ICredential|undefined => {
        if (credential.username === username && credential.password === password) return credential;
    });

    if(credentialFinded === undefined) throw Error
    else return credentialFinded.id;
};