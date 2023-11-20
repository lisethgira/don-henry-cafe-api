//Interface
const classInterfaceProducts = require("../infra/conectors/interfaceDAOProducts");

const getProducts = async (objParams) => {
    let = { intId } = objParams;

    let dao = new classInterfaceProducts();

    let query = { intId: intId };

    let result = await dao.getProducts(query);

    return result;
};
module.exports = getProducts;