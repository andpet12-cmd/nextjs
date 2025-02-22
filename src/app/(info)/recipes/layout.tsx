import {Metadata} from "next";
import React from "react";

export const metadata: Metadata = {
    title: "RecipesPage metadata",
}

type Props = { children: React.ReactNode };
const RecipesPage = ({children}: Props) => {
    return (
        <>
            {children}
        </>
    );
};

export default RecipesPage;