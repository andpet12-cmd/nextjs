'use client';
import { IUser } from "@/models/IUser";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { taskProcessor } from "@/components/recipes/recipe-filter/util/util";
import { useEffect, useState } from "react";
import IRecipe from "@/models/IRecipe";
import { allRoute } from "@/api/route.services";

export const RecipeDetails = () => {
    const path = usePathname();
    const { type, tags } = taskProcessor(path || '');

    const queryParams = new URLSearchParams({
        type,
        tag: tags?.[0] || '',
        typeTag: tags?.[1] || ''
    }).toString();

    const [recipe, setRecipe] = useState<IRecipe | null>(null);
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await allRoute(`slug-data?${queryParams}`);
                setRecipe(response?.recipe || null);
                setUser(response?.user || null);
            } catch (err) {
                setError("Error fetching data. Please try again.");
                console.error("Error fetching data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [queryParams]); // Використовуємо `queryParams`, а не `path`

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className={classNames("recipe-details-wrapper")}>
            {recipe && user ? (
                <>
                    <h2>
                        {recipe.name} edited by{' '}
                        <span>
                            <Link href={`/users/id=${user.id}`}>
                                {user.firstName} {user.lastName}
                            </Link>
                        </span>
                    </h2>
                    <div className={classNames("info-wrapper")}>
                        <img src={recipe.image} alt={recipe.name} />
                        <section>
                            <div className={classNames("tags-and-special-container")}>
                                <ul>
                                    <li><strong>Prepare time:</strong> {recipe.prepTimeMinutes} mins</li>
                                    <li><strong>Cook time:</strong> {recipe.cookTimeMinutes} mins</li>
                                    <li><strong>Servings:</strong> {recipe.servings}</li>
                                    <li><strong>Difficulty:</strong> {recipe.difficulty}</li>
                                    <li><strong>Calories per Serving:</strong> {recipe.caloriesPerServing}</li>
                                </ul>
                                <ul>Tags:
                                    {recipe.tags.map((tag, index) => <li key={index}>{tag} </li>)}
                                </ul>
                            </div>
                            <div className={classNames("ingredients-container")}>
                                <ul>Ingredients:
                                    {recipe.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className={classNames("instructions-container")}>
                                <h3>Instruction: </h3>
                                {recipe.instructions.map((text, index) => <p key={index}>{text}</p>)}
                            </div>
                        </section>
                    </div>
                </>
            ) : (
                <p>No recipe found.</p>
            )}
        </div>
    );
};
