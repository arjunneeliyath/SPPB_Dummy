export const setFormattedDate = (date: Date) => {
    let mm = (date.getMonth() + 1).toString();
    let dd = date.getDate().toString();
    if (mm.toString().length === 1) {
        mm = `0${mm}`;
    }
    if (dd.toString().length === 1) {
        dd = `0${dd}`;
    }
    const yyyy = date.getFullYear();
    return mm + '/' + dd + '/' + yyyy;
};
