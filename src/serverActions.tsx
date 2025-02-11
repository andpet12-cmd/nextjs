'use server';

import {axiosInstance} from "@/services/api.service";

const serverActions = async (formData:FormData) => {
    try {
        await axiosInstance.post('/cars', formData);
    } catch (error) {
        console.error('Error:', error);
    }
};
export default serverActions;
