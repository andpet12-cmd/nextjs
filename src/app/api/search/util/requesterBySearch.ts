import {allService, refresh} from "@/api/api.service";
import { IResponse } from "@/models/IResponse";
import {IUser} from "@/models/IUser";
import IRecipe from "@/models/IRecipe";
import { NextResponse } from "next/server";
import {filterData} from "@/app/api/search/util/searchUtil";

export const searchRequest = async (subject: string, essence: string, token: string) => {

    const condition = parseInt(essence);
    if (condition) {
        try {

            const data = await allService<IResponse<IRecipe[]> | IResponse<IUser[]>>(subject, '', 'Authorization', token);
            if(subject.includes('users')){
                const filteredData = filterData(data.users, condition);
                return NextResponse.json(filteredData);
            }else if(subject.includes('recipes')){
                const filteredData = filterData(data.recipes, condition);
                return NextResponse.json(filteredData);
            }


        } catch {
            try {

                const newToken = await refresh();

                const headerNew = `Bearer ${newToken}`
                const data = await allService<IResponse<IRecipe[]> | IResponse<IUser[]>>(subject, '', 'Authorization', headerNew);

                if(subject.includes('users')){
                    const filteredData = filterData(data.users, condition);
                    return NextResponse.json(filteredData);
                }else if(subject.includes('recipes')){
                    const filteredData = filterData(data.recipes, condition);
                    return NextResponse.json(filteredData);
                }

                if (!data) {
                    return NextResponse.json('error');
                }
            } catch {
                return NextResponse.json('error');
            }
        }
    } else if (!condition) {
        try {

            const data = await allService<IResponse<IRecipe[]> | IResponse<IUser[]>>(subject, '', 'Authorization', token);
            if (subject.includes('users')) {
                const filteredData = filterData(data.users, essence, subject);
                return NextResponse.json(filteredData);
            } else if (subject.includes('recipes')) {
                const filteredData = filterData(data.recipes, essence, subject);
                return NextResponse.json(filteredData);
            }


        } catch {
            try {

                const newToken = await refresh();

                const headerNew = `Bearer ${newToken}`
                const data = await allService<IResponse<IRecipe[]> | IResponse<IUser[]>>(subject, '', 'Authorization', headerNew);

                if (subject.includes('users')) {
                    const filteredData = filterData(data.users, essence, subject);
                    return NextResponse.json(filteredData);
                } else if (subject.includes('recipes')) {
                    const filteredData = filterData(data.recipes, essence, subject);
                    return NextResponse.json(filteredData);
                }

                if (!data) {
                    return NextResponse.json('error');
                }
            } catch {
                return NextResponse.json('error');
            }
        }
    }else{
        return NextResponse.json('error');
    }
}