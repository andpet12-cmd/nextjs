'use client';
import {IUser} from "@/models/IUser";
import {FC} from "react";
import {useRouter} from "next/router";
import classNames from "classnames";

interface Props {
    item: IUser;
}

export const UserItem: FC<Props> = ({item}) => {
    const router = useRouter();
    const userDetails = () => {
        router.push(`/users/id=${item.id}`)
    }

    return (
        <div className={classNames('user-short-details-wrapper')}>
            <h2>{item.firstName}{item.lastName}</h2>
            <h3>Age: {item.age}</h3>
            <p>User id: {item.id}</p>
            <p className={classNames('arabic')}>Email: {item.email}</p>
            <button onClick={userDetails}>Details</button>
        </div>
    );
};