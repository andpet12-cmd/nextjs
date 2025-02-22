'use client';
import {usePathname, useSearchParams} from "next/navigation";
import {taskProcessor} from "@/components/recipes/recipe-filter/util/util";
import {useEffect, useState} from "react";
import {IResponse} from "@/models/IResponse";
import IRecipe from "@/models/IRecipe";
import {allRoute} from "@/api/route.services";
import {RecipeItem} from "@/components/recipes/recipe-item/RecipeItem";
import {Pagination} from "@/components/pagination/Pagination";
import classNames from "classnames";

export const FilterByTag = () => {

    const searchParams = useSearchParams();
    const params = searchParams?.get('page')
    const page = params ? parseInt(params) : 1;
    const itemsPerPage = 2;
    const skip = (page - 1) * itemsPerPage;
    const path = usePathname();
    const {type, tags} = taskProcessor(path || '');
    const paginationTag = `${tags[1]}`;

    const parameters = `?type=${type}&tag=${tags[0]}&typeTag=${tags[1]}&skip=${skip}&limit=${itemsPerPage}`;
    const [data, setData] = useState<IResponse<IRecipe[]>>();

    useEffect(() => {

        const fetchData = async () => {
            try {
                const data = await allRoute(`slug-data${parameters}`);

                setData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();

    }, [searchParams.toString()]);


    return (
        <div className={classNames('filtered-info')}>
            <div className={classNames('filtered-recipes-list-wrapper')}>
                {data && data.recipes.map((recipe) => <RecipeItem key={recipe.id} item={recipe}/>)}
            </div>
            <Pagination
                totalItems={data ? data.total : 0}
                itemsPerPage={itemsPerPage}
                currentPage={page}
                type={type}
                tag={paginationTag}
            />
        </div>
    );
};