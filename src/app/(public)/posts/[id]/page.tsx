import {FC} from "react";

type Props = {
    params: {id: number};
}

const PostsPage:FC<Props> = async ({params}) => {

    const {id} = await params;

    return (
        <div>
            post page {id}
        </div>
    );
};

export default PostsPage;