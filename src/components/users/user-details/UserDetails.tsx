'use client';
import { usePathname } from "next/navigation";
import { taskProcessor } from "@/components/recipes/recipe-filter/util/util";
import { useEffect, useState } from "react";
import { IUser } from "@/models/IUser";
import IRecipe from "@/models/IRecipe";
import { allRoute } from "@/api/route.services";
import classNames from "classnames";
import Link from "next/link";

export const UserDetails = () => {
    const path = usePathname();
    const { type, tags } = taskProcessor(path || '');
    const parameters = `?type=${type}&tag=${tags[0]}&typeTag=${tags[1]}`;

    const [recipes, setRecipes] = useState<IRecipe[]>([]);
    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const { recipesByUser, user } = await allRoute(`slug-data${parameters}`);
                setRecipes(recipesByUser || []);
                setUser(user || null);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        })();
    }, [parameters]);

    return (
        <div className={classNames('user-details-wrapper')}>
            {user ? (
                <>
                    <h2>{user.firstName} {user.lastName}</h2>
                    <img src={user.image} alt={user.firstName} />
                    <p className={classNames('italic')}><span>Email:</span> {user.email}</p>
                    <p className={classNames('italic')}><span>Phone:</span> {user.phone}</p>
                    <p><span>Address:</span> {user.address?.address || "N/A"}</p>
                    <p><span>Birthday:</span> {user.birthDate}</p>
                    <p><span>University:</span> {user.university}</p>
                    <p><span>Role:</span> {user.role}</p>
                    <p><span>Gender:</span> {user.gender}</p>

                    {recipes.length > 0 ? (
                        <ul>User recipes:
                            {recipes.map((recipe) => (
                                <li key={recipe.id}>
                                    <Link href={`/recipes/${recipe.id}`}>{recipe.name}</Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Current user doesn’t have any recipes</p>
                    )}
                </>
            ) : (
                <p>Loading user details...</p>
            )}
        </div>
    );
};
