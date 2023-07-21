export const fetchData = async (url, pageNumber) => {
    let res = {};
    try {
        console.log(`${url}?page=${pageNumber}`)
        const response = await fetch(
            `${url}?page=${pageNumber}`,
            {
                method: "GET",
            }
        );
         res = await response.json();
        // setData(res);
        console.log(res);
    } catch (err) {
        console.log(err);
    }
    return res;
};
export const fetchData2  = async (url) => {
    let res = {};
    try {
        const response = await fetch(
            `${url}`,
            {
                method: "GET",
            }
        );
         res = await response.json();
        // setData(res);
        // console.log(res);
    } catch (err) {
        console.log(err);
    }
    return res;
};