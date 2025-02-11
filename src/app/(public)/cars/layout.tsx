import {Metadata} from "next";
import React from "react";


export const metadata: Metadata = {
    title: "CarsLayout metadata",
}

type Props = {children: React.ReactNode};
const CarsLayout = ({children}:Props) => {
  return (
      <>
          {children}
      </>
  );
};

export default CarsLayout;
