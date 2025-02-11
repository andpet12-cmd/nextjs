import axios from 'axios';
import {ICar} from "@/models/ICar";

export const axiosInstance =  axios.create({
    baseURL: 'http://185.69.152.209/carsAPI/v1',
    headers:{'Content-Type': 'application/json'},
});

export const fetch = async<T>(endpoint: string):Promise<T> => {
    const { data } = await axiosInstance.get<T>(endpoint);
    return data;
}
export const addCar = async(car:ICar):Promise<void> => {
    await axiosInstance.post("/cars", car);
}