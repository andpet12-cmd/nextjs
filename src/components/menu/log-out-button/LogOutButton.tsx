'use client';
import {useState} from "react";
import {useRouter} from "next/router";

export const LogOutButton = () => {

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogoutAction = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
            });
            if (response.ok) {
                await router.push('/login');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <button onClick={handleLogoutAction} disabled={loading}>
            {loading ? 'Logging out...' : 'Logout'}
        </button>
    );
};