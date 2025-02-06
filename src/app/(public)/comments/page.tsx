'use client'
import {useRouter} from "next/navigation";
import {IComment} from "@/models/IComment";

const CommentsPage = () => {
    const comments: IComment[] = [
        {id: 1, text: 'comment 1'},
        {id: 2, text: 'comment 2'},
        {id: 3, text: 'comment 3'},

    ];

    const router = useRouter();

    const handleClick = (id: number) => {
        router.push(`/comments/${id}`);
    }

    return (
        <div>
            Comments list page
            <ul>
                {comments.map((comment: IComment) =>
                    <li key={comment.id}>
                        <button onClick={() => {
                            handleClick(comment.id)
                        }}>{comment.text}</button></li>)}
            </ul>
        </div>
    );
};

export default CommentsPage;