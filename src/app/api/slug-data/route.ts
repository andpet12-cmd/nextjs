import {NextRequest, NextResponse} from "next/server";
import {myRequest} from "@/app/api/slug-data/utils/requester";
import {helperTagsRecipes} from "@/app/api/slug-data/utils/slugUtil";

export async function GET(req: NextRequest) {

    try {
        const token = req.headers.get("Authorization");

        if (!token) {
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        const urlMy = new URL(req.url);
        const searchParams = urlMy.searchParams;

        const {type, params} = helperTagsRecipes(searchParams);

        if (!type || !params) {
            return NextResponse.json({error: "Invalid query parameters"}, {status: 400});
        }

        const data = await myRequest(type, params, token);
        return NextResponse.json(data);
    } catch (error) {
        console.error('API Error', error);
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
    }


}