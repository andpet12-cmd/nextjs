import {IResponse} from "@/models/IResponse";
import {IUser} from "@/models/IUser";
import IRecipe from "@/models/IRecipe";

export const helperTagsRecipes = (searchParams: URLSearchParams) => {

    const tag = searchParams.get('tag') || '';
    const prototype = searchParams.get('type') || '';
    const typeTag = searchParams.get('typeTag');

    if (tag === 'tag') {
        const type = `/${prototype}/${tag}/${typeTag}`;
        const skip = parseInt(searchParams.get('skip') || '0');
        const limit = parseInt(searchParams.get('limit') || '4');

        const params = `?limit=${limit}&skip=${skip}`;

        return {type, params};

    } else if (tag === 'id') {
        const type = `/${prototype}`;
        const params = `/${typeTag}`;

        return {type, params};
    }

    return {type: '', params: ''};
};

export const filterRecipe = (user: IUser, data: IResponse<IRecipe[]>) => {
    return data.recipes.filter(((recipe) => recipe.userId === user.id));
}