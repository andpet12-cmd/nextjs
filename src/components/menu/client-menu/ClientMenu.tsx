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
    const isActive = (path: string) => location === path;

    return (
        <>
            {userWithToken ? (
                <>
                    <img src={userWithToken.image} alt="userPhoto"/>
                    <ul className={classNames('navigate')}>
                        <li className={classNames('pages')}>
                            <LogOutButton/>
                        </li>
                        <li className={classNames('pages', {'active': isActive('/')})}>
                            <Link href={'/'}>Main</Link>
                        </li>
                        <li className={classNames('pages', {'active': isActive('/users')})}>
                            <Link href={'/users'}>Users</Link>
                        </li>
                        <li className={classNames('pages', {'active': isActive('/recipes')})}>
                            <Link href={'/recipes'}>Recipes</Link>
                        </li>
                    </ul>
                </>
            ) : (
              <li className={classNames('pages',{'active': isActive('/login')})}>
                  <Link href={'/login'}>Login</Link>
              </li>
            )}
        </>
    );
};
export default ClientMenu;