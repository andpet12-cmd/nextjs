'use client';
import { usePathname, useSearchParams } from "next/navigation";
import { taskProcessor } from "@/components/recipes/recipe-filter/util/util";
import { useEffect, useState } from "react";
import { IResponse } from "@/models/IResponse";
import IRecipe from "@/models/IRecipe";
import { allRoute } from "@/api/route.services";
import { RecipeItem } from "@/components/recipes/recipe-item/RecipeItem";
import { Pagination } from "@/components/pagination/Pagination";
import classNames from "classnames";

export const FilterByTag = () => {
    const searchParams = useSearchParams();
    const page = parseInt(searchParams?.get('page') || '1', 10);
    const itemsPerPage = 2;
    const skip = (page - 1) * itemsPerPage;
    const path = usePathname();
    const { type, tags } = taskProcessor(path || '');
    const paginationTag = tags?.[1] || '';

    const [data, setData] = useState<IResponse<IRecipe[]> | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            const queryParams = new URLSearchParams({
                type,
                tag: tags[0] || '',
                typeTag: tags[1] || '',
                skip: skip.toString(),
                limit: itemsPerPage.toString(),
            }).toString();

            try {
                const response = await allRoute(`slug-data?${queryParams}`);
                setData(response);
            } catch (err) {
                setError("Error fetching data. Please try again.");
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [searchParams.toString()]); // Залежність тільки від пошукових параметрів

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className={classNames("filtered-info")}>
            <div className={classNames("filtered-recipes-list-wrapper")}>
                {data?.recipes.length ? (
                    data.recipes.map((recipe) => <RecipeItem key={recipe.id} item={recipe} />)
                ) : (
                    <p>No recipes found.</p>
                )}
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
