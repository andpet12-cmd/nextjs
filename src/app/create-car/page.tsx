"use client";

import { useState } from "react";
import {ICar} from "@/models/ICar";
import {addCar} from "@/services/api.service";



export default function CreateCarPage() {
    const [formState, setFormState] = useState<{ message: string | null }>({ message: null });

    async function createCarAction(formData: FormData) {



        try {
            const newCar: ICar = {
                brand: formData.get("brand") as string,
                price: Number(formData.get("price")),
                year: Number(formData.get("year")),
            };

            await addCar(newCar);
            setFormState({ message: "Car added successfully!" });

        } catch (error) {
            console.error(error);
            setFormState({ message: "Failed to add car. Please try again." });
        }
    }

    return (
        <form action={createCarAction} className='page'>
            {formState.message && <p className='page'>{formState.message}</p>}

            <div>
                <input name='brand' type="text" placeholder="Brand" required />
            </div>

            <div>
                <input name="price" type="number" placeholder="Price" required />
            </div>

            <div>
                <input name="year" type="number" placeholder="Year" required />
            </div>

            <button>Save Car</button>
        </form>
    );
}