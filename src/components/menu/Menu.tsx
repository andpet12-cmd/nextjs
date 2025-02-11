import Link from "next/link";

export const Menu = () => {
    return (
        <div>
            <h1><Link href="/">Home</Link></h1>
            <h2><Link href="/cars">Cars</Link></h2>
            <h2><Link href="/create-car">Create car</Link></h2>
        </div>
    );
};