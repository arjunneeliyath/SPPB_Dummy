import { statusEndPointResponse } from '../mocks/stats-endpoint-mock';
import axios from '../utils/interceptor';
import { mockPromise } from '../utils/mock-promise';

export const getStatusAPI = () => {
    return mockPromise(statusEndPointResponse);
};

export const getSampleData = async (): Promise<any> => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_SAMPLE_API_DOMAIN}/firstPost`, {
            data: 'HelloUser',
        });
        return response;
    } catch (error) {
        //Implement Error Handling
        throw new Error('Something went wrong');
    }
};
