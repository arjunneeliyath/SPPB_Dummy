export const mockPromise = <T>(response: T, timeout = 1000): Promise<{ data: T; status: number }> => {
    //TODO: this comments will be removed when integrating real APIs.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ data: response, status: 200 });
            // reject({errors:[
            //     {
            //         code: '004',
            //         message: 'something went wrong'
            //     }
            // ],status:500});
        }, timeout);
    });
};
