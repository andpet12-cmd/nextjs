import Link from "next/link";

export const Menu = () => {
    return (
        <>
            <ul>
                <li>
                    <Link href="/">home</Link>
                </li>
                <li>
                    <Link href="/posts">posts</Link>
                </li>
                <li>
                    <Link href="/comments">comments</Link>
                </li>
                <li>
                    <Link href="/users">users</Link>
                </li>
            </ul>
            <hr/>
        </>
    );
};