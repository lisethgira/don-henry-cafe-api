//Interface
const classInterfaceOrders = require("../infra/conectors/interfaceDAOOrders");

const getOrders = async (objParams) => {
    let = { intId } = objParams;

    let dao = new classInterfaceOrders();

    let query = { intId: intId };

    let result = await dao.getOrders(query);

    return result;
};
module.exports = getOrders;