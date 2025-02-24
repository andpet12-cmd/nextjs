import { Metadata } from "next";
import { FilterByTag } from "@/components/recipes/recipe-filter/FilterByTag";
import { RecipeDetails } from "@/components/recipes/recipe-details/RecipeDetails";

type Props = {
    params: { slug?: string[] };
};

export const generateMetadata = ({ params }: Props): Metadata => {
    const slug = params.slug;

    if (slug?.[0]?.includes("tag")) {
        return {
            title: "Filter by Tag",
            description: "Browse recipes by selected tag.",
        };
    } else if (slug?.[0]?.includes("id")) {
        return {
            title: "Recipe Details",
            description: "Detailed view of a selected recipe.",
        };
    }

    return {
        title: "Not Found",
        description: "The requested page could not be found.",
    };
};

const SlugPage = ({ params }: Props) => {
    const slug = params.slug;

    if (slug?.[0]?.includes("tag")) {
        return <FilterByTag />;
    } else if (slug?.[0]?.includes("id")) {
        return <RecipeDetails />;
    }

    return <p>Page not found</p>;
};

export default SlugPage;
