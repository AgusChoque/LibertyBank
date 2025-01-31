import DateString from "../types/DateString"

interface UserDto {
    name: string
    email: string
    birthdate: DateString
    nDni: number
    credentialId: number
};

export default UserDto;