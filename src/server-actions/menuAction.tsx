'use server';
import {deleteCookie} from "cookies-next";
import {cookies} from "next/headers";

export const menuAction = async () => {
    await deleteCookie('authUser', {cookies});
}