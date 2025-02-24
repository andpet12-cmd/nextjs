'use client';
import {usePathname} from "next/navigation";
import classNames from "classnames";
import {LogOutButton} from "@/components/menu/log-out-button/LogOutButton";
import Link from "next/link";
import {IUserInfoWithTokens} from "@/models/IUserInfoWithToken";

interface Props {
    userWithToken: IUserInfoWithTokens | null;
}

const ClientMenu = ({userWithToken}: Props) => {

    const location = usePathname();
    const isActive = (path: string) => location.startsWith(path);

    return (
        <>
            {userWithToken ? (
                <>
                    {userWithToken.image && (
                        <img src={userWithToken.image} alt="User profile" loading="lazy"/>
                    )}

                    <ul className='navigate'>
                        {[
                            {path: "/", label: "Main"},
                            {path: "/users", label: "Users"},
                            {path: "/recipes", label: "Recipes"}
                        ].map(({path, label}) => (
                            <li key={path} className={classNames("pages", {active: isActive(path)})}>
                                <Link href={path}>{label}</Link>
                            </li>
                        ))}
                        <li className="pages">
                            <LogOutButton/>
                        </li>
                    </ul>
                </>
            ) : (
                <li className={classNames('pages', {'active': isActive('/login')})}>
                    <Link href={'/login'}>Login</Link>
                </li>
            )}
        </>
    );
};
export default ClientMenu;