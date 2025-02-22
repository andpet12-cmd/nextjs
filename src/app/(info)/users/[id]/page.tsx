import {UserDetails} from "@/components/users/user-details/UserDetails";
import {Metadata} from "next";

export const generateMetadata = async (): Promise<Metadata> => {
    return {
        title: "",
        description: "",
    }
}

const UserByIdPage = () => {
    return (
        <div>
            <UserDetails/>
        </div>
    );
};

export default UserByIdPage;