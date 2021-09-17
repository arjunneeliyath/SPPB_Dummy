import { toast } from 'react-toastify';

export const handleError = (error: any) => {
    //const error = JSON.parse(errorString);
    if (error?.errors?.forEach) {
        error?.errors?.forEach((error: any) => toast.error(error.message));
    } else if (error.message) {
        toast.error(error.message);
    } else if (error?.error) {
        toast.error(error.error);
    } else {
        toast.error('Something went wrong');
    }
    return error;
};
