import {ICar} from "@/models/ICar";
import {CarItem} from "@/components/cars/car-item/CarItem";
import {fetch} from "@/services/api.service";


const CarsList = async () => {

    const cars = await fetch<(ICar)[]>("/cars");
    return (
        <div>
            {cars.map((car) => <CarItem  key={car.id} car={car}/>)}
        </div>
    );
};
export default CarsList;