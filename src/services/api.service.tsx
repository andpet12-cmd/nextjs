import {IUser} from "@/models/IUser";

export const getAllUsers = async (): Promise<IUser[]> => {
    const users = await fetch('https://jsonplaceholder.typicode.com/users')
        .then(value => value.json());

    return users;

}