import {getCookie} from "cookies-next/server";
import {cookies} from "next/headers";
import classNames from "classnames";
import {IUserInfoWithTokens} from "@/models/IUserInfoWithToken";
import "./Menu.css"

export const Menu = async () => {
    const validUser = await getCookie('authUser', {cookies});
    const userWithToken: IUserInfoWithTokens | null = validUser ? JSON.parse(validUser) : null;

    return (
        <div className={classNames('menu-wrapper', {'login': userWithToken})}></div>
    );
};