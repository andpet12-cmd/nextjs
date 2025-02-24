'use client';
import classNames from "classnames";
import { IUser } from "@/models/IUser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import IRecipe from "@/models/IRecipe";
import { useEffect, useState } from "react";
import { allRoute } from "@/api/route.services";
import { schema } from "@/validator/search.validator";
import { usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';


interface ISearchData {
    searching: string;
}

export const Search = () => {
    const { handleSubmit, register, formState: { errors }, watch, reset }
        = useForm<ISearchData>({ mode: 'onChange', resolver: zodResolver(schema) });

    const searchValue = watch("searching", "").trim();
    const pathName = usePathname();
    const router = useRouter();

    const [users, setUsers] = useState<IUser[]>([]);
    const [recipes, setRecipes] = useState<IRecipe[]>([]);

    const handleSearch = async (searchingData: ISearchData) => {
        const params = searchingData.searching.trim();
        if (params.length === 0) return;

        const path = pathName.slice(1);
        const query = (+params && +params > 0)
            ? `search?type=${path}&id=${+params}`
            : `search?type=${path}&params=${params}`;

        try {
            const data = await allRoute(query);
            if (data === 'error') {
                router.push('/login');
                return;
            }

            if (Array.isArray(data)) {
                path === "users" ? setUsers(data) : setRecipes(data);
            }
        } catch (error) {
            console.error("Search error:", error);
        }
    };

    const debouncedSearch = useDebouncedCallback(handleSearch, 500);

    useEffect(() => {
        if (searchValue.length > 0) {
            debouncedSearch({ searching: searchValue });
        } else {
            setUsers([]);
            setRecipes([]);
        }
    }, [searchValue, pathName]);

    const handleChoice = (type: string, item: IRecipe | IUser) => {
        router.push(`/${type}s/${item.id}`);
        reset();
    };

    return (
        <>
            {(pathName === "/users" || pathName === "/recipes") && (
                <div className={classNames('form-wrapper')}>
                    <h3>Search</h3>
                    <form className={classNames('form-search')} onChange={handleSubmit(handleSearch)}>
                        <label>
                            <input type="text" {...register('searching')} />
                        </label>
                        <p className={!errors.searching ? 'hide' : 'view'}>
                            {errors.searching?.message}
                        </p>
                    </form>

                    {(users.length > 0 || recipes.length > 0) && (
                        <div className="find-list">
                            {users.length > 0 && pathName === "/users" && (
                                <ul>
                                    {users.map(user => (
                                        <li key={user.id}>
                                            <button onClick={() => handleChoice('user', user)}>
                                                {user.firstName} {user.lastName} (ID: {user.id})
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {recipes.length > 0 && pathName === "/recipes" && (
                                <ul>
                                    {recipes.map(recipe => (
                                        <li key={recipe.id}>
                                            <button onClick={() => handleChoice('recipe', recipe)}>
                                                {recipe.name} (ID: {recipe.id})
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            )}
        </>
    );
};
