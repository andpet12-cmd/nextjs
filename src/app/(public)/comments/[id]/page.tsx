import {FC} from "react";

type Props = {
    params: { id: number }
}
const CommentsPage: FC<Props> = async ({params}) => {
    const {id} = await params;
    return (
        <div>
            comment page content {id}
        </div>
    );
};
export default CommentsPage;