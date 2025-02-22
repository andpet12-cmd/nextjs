import {useEffect, useState} from "react";
import IRecipe from "@/models/IRecipe";
import {Pagination} from "@/components/pagination/Pagination";
import classNames from "classnames";
import {IResponse} from "@/models/IResponse";
import {useSearchParams} from "next/navigation";
import {allRoute} from "@/api/route.services";
import {RecipeItem} from "@/components/recipes/recipe-item/RecipeItem";

export const RecipesList = () => {

    const searchParams = useSearchParams();
    const params = searchParams?.get('page')
    const page = params ? parseInt(params) : 1;
    const itemsPerPage = 4;
    const skip = (page - 1) * itemsPerPage;
    const type = 'recipes';

    const [data, setData] = useState<IResponse<IRecipe[]>>();

    useEffect(() => {

        const fetchData = async () => {
            try {
                const data = await allRoute(`all-data?limit=${itemsPerPage}&skip=${skip}&type=${type}`);

                setData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

    }, [searchParams.toString()]);

    return (
        <div className={classNames('recipes-all-info')}>
            <div className={classNames('recipes-list-wrapper')}>
                {data ? data.recipes.map((item: IRecipe) => <RecipeItem key={item.id} item={item}/>) : null}
            </div>
            <Pagination
                totalItems={data ? data.total : 0}
                itemsPerPage={itemsPerPage}
                currentPage={page}
                type={type}
            />
        </div>
    );
};