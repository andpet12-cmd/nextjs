import {FC} from "react";
import {ICar} from "@/models/ICar";

type Props = {
    car: ICar;
}
export const CarItem:FC<Props> = ({car}:Props) => {
    return (
        <div>
            <h3>Brand: {car.brand}</h3>
            <p>Year: {car.year}</p>
            <p>Price: {car.price}</p>
        </div>
    );
};