import {getAllUsers} from "@/services/api.service";
import Link from "next/link";

export const UsersComponent = async () => {
    const users = await getAllUsers();
    return (
        <div>
            {
                users.map((user) => <div key={user.id}>
                    <Link href={{pathname:'/users/' + user.id.toString(),query:{data:JSON.stringify(user)}}}>{user.id} {user.name}</Link>
                </div>)
            }
        </div>
    );
};