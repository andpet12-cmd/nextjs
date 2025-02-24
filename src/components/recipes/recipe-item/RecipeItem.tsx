'use client';
import IRecipe from "@/models/IRecipe";
import { FC } from "react";
import { useRouter } from "next/navigation";
import classNames from "classnames";

interface Props {
    item: IRecipe;
}

export const RecipeItem: FC<Props> = ({ item }) => {
    const router = useRouter();

    const recipeDetails = () => {
        router.push(`/recipes?id=${item.id}`);
    };

    const handlerFilter = (tag: string) => {
        router.push(`/recipes?tag=${tag}`);
    };

    return (
        <div className={classNames("recipe-item-wrapper")}>
            <img src={item.image} alt={`Image of ${item.name}`} loading="lazy" />
            <div className={classNames("recipe-info")}>
                <h2>{item.name}</h2>
                <ul>
                    Tags:{" "}
                    {item.tags.map((tag, index) => (
                        <li key={index}>
                            <button onClick={() => handlerFilter(tag)} aria-label={`Filter by ${tag}`}>
                                {tag}
                            </button>
                        </li>
                    ))}
                </ul>
                <button className={classNames("info")} onClick={recipeDetails} aria-label={`View details of ${item.name}`}>
                    Info
                </button>
            </div>
        </div>
    );
};
