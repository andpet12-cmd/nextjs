import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: "UsersPage metadata",
}

type Props = { children: React.ReactNode };
const UsersPage = ({children}: Props) => {
    return (
        <>
            {children}
        </>
    );
};

export default UsersPage;