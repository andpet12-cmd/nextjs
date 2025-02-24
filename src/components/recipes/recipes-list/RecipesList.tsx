'use client';
import { useEffect, useState } from "react";
import IRecipe from "@/models/IRecipe";
import { Pagination } from "@/components/pagination/Pagination";
import classNames from "classnames";
import { IResponse } from "@/models/IResponse";
import { useSearchParams } from "next/navigation";
import { allRoute } from "@/api/route.services";
import { RecipeItem } from "@/components/recipes/recipe-item/RecipeItem";

export const RecipesList = () => {
    const searchParams = useSearchParams();
    const page = parseInt(searchParams?.get("page") || "1", 10);
    const itemsPerPage = 4;
    const skip = (page - 1) * itemsPerPage;

    const [data, setData] = useState<IResponse<IRecipe[]> | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await allRoute(`all-data?limit=${itemsPerPage}&skip=${skip}&type=recipes`);
                setData(response);
            } catch (error) {
                setError("Error fetching data");
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [page, skip]);

    return (
        <div className={classNames("recipes-all-info")}>
            <div className={classNames("recipes-list-wrapper")}>
                {isLoading && <p>Loading...</p>}
                {error && <p className="error">{error}</p>}
                {data && data.recipes.map((item) => <RecipeItem key={item.id} item={item} />)}
            </div>
            <Pagination
                totalItems={data ? data.total : 0}
                itemsPerPage={itemsPerPage}
                currentPage={page}
                type="recipes"
            />
        </div>
    );
};
