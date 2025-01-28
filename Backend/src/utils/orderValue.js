const getOrderValue = (order) => {
    switch (order) {
        case "asc":
            return -1;
        case "desc":
            return 1;
        default:
            return 0;
    }
};

module.exports = { getOrderValue };
