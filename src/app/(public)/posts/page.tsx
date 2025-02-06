'use client';
import {useRouter} from "next/navigation";
import {IPost} from "@/models/IPost";


const PostsPage = () => {
    const posts: IPost[] = [
        {id: 1, title: 'comment 1'},
        {id: 2, title: 'comment 2'},
        {id: 3, title: 'comment 3'},
    ];

    const router = useRouter();

    const handleClick = (id: number) => {
        router.push(`/posts/${id}`);
    }

    return (
        <div>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <button onClick={() => {
                            handleClick(post.id);
                        }}></button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostsPage;
