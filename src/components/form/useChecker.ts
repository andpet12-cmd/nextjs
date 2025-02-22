import {useEffect, useState} from "react";

export const useChecker = (login: string, validation: string, newError: string) => {
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>();

    useEffect(() => {

        if (login === 'true') {
            setError(false);
            setMessage('');
        } else if (login === 'false') {
            setError(true);
            setMessage('Invalid login or password');
        } else if (validation === 'error') {
            setError(true);
            setMessage('Invalid login or password');
        } else if (newError === 'error') {
            setError(true);
            setMessage('Your data is not correct. Sign in again!');
        }
    }, [login, validation, newError]);
    return {error, message};
};