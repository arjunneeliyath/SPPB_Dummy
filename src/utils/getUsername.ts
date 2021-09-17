export const getUsernameLogo = (username: string) => {
    const nameArr = username?.split(' ');
    return {
        logo: nameArr?.length ? nameArr[0][0] + nameArr[1][0] : 'AA',
        name: username,
    };
};
