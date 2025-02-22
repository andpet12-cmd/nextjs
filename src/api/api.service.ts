import axios from 'axios';
import {cookies} from "next/headers";
import {getAuthUser} from "@/api/helper";
import {ITokenPair} from "@/models/ITokenPair";
import {IUserInfoWithTokens} from "@/models/IUserInfoWithToken";


export type FormLoginData = {
    username: string;
    password: string;
    expiresInMins: number
};

export const baseUrl = process.env.NEXT_API_URL;

export const axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {}
});

export const login = async ({username, password, expiresInMins}: FormLoginData): Promise<IUserInfoWithTokens> => {

    const {data: userWithTokens} = await axiosInstance.post<IUserInfoWithTokens>('/login', {
        username,
        password,
        expiresInMins
    });

    return userWithTokens;
};

export const allService = async <T, >(url: string, params: string, key: string, value: string) => {

    const {data} = await axiosInstance.get<T>(`${url}${params}`, {
        headers: {
            [key] : value
        }
    });

    return data;
};

export const refresh = async (): Promise<IUserInfoWithTokens> => {
    const iUserWithTokens = await getAuthUser<IUserInfoWithTokens>();

    if (!iUserWithTokens) {
        throw new Error("No authentication information");
    }

    const { data: { accessToken, refreshToken } } = await axiosInstance.post<ITokenPair>("/refresh", {
        refreshToken: iUserWithTokens.refreshToken,
        expiresInMin: 30,
    });

    const updatedUser: IUserInfoWithTokens = {...iUserWithTokens, accessToken,refreshToken};

    (await cookies()).set('authUser', JSON.stringify(updatedUser), {
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    });

    return updatedUser;
};
