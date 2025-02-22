import {allService, refresh} from "@/api/api.service";
import {NextResponse} from "next/server";
import {IUser} from "@/models/IUser";
import IRecipe from "@/models/IRecipe";
import {IResponse} from "@/models/IResponse";
import {filterRecipe} from "@/app/api/slug-data/utils/slugUtil";

export const myRequest = async (type: string, params: string, token: string) => {

    if (params.includes('?')) {
        try {

            const data = await allService(type, params, 'Authorization', token);
            return NextResponse.json(data);
        } catch {
            try {
                const newToken = await refresh();

                if (!newToken) {
                    console.log('test');
                }

                const headerNew = `Bearer ${newToken}`
                const data = await allService(type, params, 'Authorization', headerNew);

                if (!data) {
                    return NextResponse.json({message: 'Повтор запиту не успішний'}, {status: 400});
                }
                return NextResponse.json(data);
            } catch {
                return NextResponse.json({message: 'Помилка оновлення токену'}, {status: 500});
            }
        }
    } else if (params.includes('/')) {
        try {
            if (type.includes('recipes')) {
                const recipe = await allService<IRecipe>(type, params, 'Authorization', token);
                const usId = recipe.userId;
                const user = await allService<IUser>('/users', `/${usId}`, 'Authorization', token);
                return NextResponse.json({recipe, user});
            } else if (type.includes('user')) {

                const user = await allService<IUser>(type, params, 'Authorization', token);
                const recipes = await allService<IResponse<IRecipe[]>>('/recipes', '?limit=0', 'Authorization', token);
                const recipesByUser = filterRecipe(user, recipes);
                return NextResponse.json({recipesByUser, user});
            }
        } catch {
            try {
                const newToken = await refresh();

                if (!newToken) {
                    console.log('test');
                }

                const headerNew = `Bearer ${newToken}`
                if (type.includes('recipes')) {
                    const recipe = await allService<IRecipe>(type, params, 'Authorization', headerNew);
                    const usId = recipe.userId;
                    const user = await allService<IUser>('/users', `/${usId}`, 'Authorization', headerNew);


                    if (!recipe || !user) {
                        return NextResponse.json({message: 'Повтор запиту не успішний'}, {status: 400});
                    }
                    return NextResponse.json({recipe, user});

                } else if (type.includes('user')) {
                    const user = await allService<IUser>(type, params, 'Authorization', headerNew);
                    const recipes = await allService<IResponse<IRecipe[]>>('/recipes', '', 'Authorization', headerNew);
                    const recipesByUser = filterRecipe(user, recipes);

                    if (!recipesByUser || !user) {
                        return NextResponse.json({message: 'Повтор запиту не успішний'}, {status: 400});
                    }

                    return NextResponse.json({recipesByUser, user});
                }

            } catch {
                return NextResponse.json({message: 'Помилка оновлення токену'}, {status: 333});
            }
        }
    } else {
        return NextResponse.json({message: 'Params not found'}, {status: 500});
    }
}