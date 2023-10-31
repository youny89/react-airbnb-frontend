const jsonParse = (data) => {
    try {
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (error) {
        return {};
    }
}


export default jsonParse;