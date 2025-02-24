import {getCookie} from "cookies-next/server";
import {cookies} from "next/headers";
import {IUserInfoWithTokens} from "@/models/IUserInfoWithToken";
import classNames from "classnames";
import "./MainPage.css"

export const MainPage = async () => {

    const validUser = await getCookie('authUser', {cookies});
    const userWithToken: IUserInfoWithTokens | null = validUser ? JSON.parse(validUser) : null;


    return (

        <div className={classNames('main-page-wrapper')}>
            {userWithToken ? (
                <>
                    <h1>Welcome <span>{userWithToken.firstName} {userWithToken.lastName}</span></h1>
                    <h2>Nice to see you again</h2>
                    <h3>Now you can start work</h3>


                </>
            ) : (<h1>You need to ??? In</h1>)
            }
        </div>
    );
};