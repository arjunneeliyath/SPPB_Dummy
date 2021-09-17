const random = (length: any) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};

export const OPTIONS = Array.from(new Array(20000))
    .map(() => random(10 + Math.ceil(Math.random() * 20)))
    .sort((a, b) => a.toUpperCase().localeCompare(b.toUpperCase()));
