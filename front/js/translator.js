const frontBackKeysTranslations = {
    id: "_id",
    enrollment: "registration"
};

const fromFrontToBack = data => {
    const backData = {};
    const keys = Object.keys(frontBackKeysTranslations);

    Object.keys(data).forEach(key => keys.includes(key) ? backData[frontBackKeysTranslations[key]] = data[key] : backData[key] = data[key]);
    return JSON.stringify(backData);
}

const fromBackToFront = data => {
    const frontData = {};
    const keys = Object.keys(frontBackKeysTranslations);
    const values = Object.values(frontBackKeysTranslations);

    Object.keys(data).forEach(key => values.includes(key) ? frontData[keys[values.indexOf(key)]] = data[key] : frontData[key] = data[key]);
    return frontData;
}

export {
    fromFrontToBack,
    fromBackToFront
};
