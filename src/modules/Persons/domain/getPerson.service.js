//Interface
const classInterfacePerson = require("../infra/conectors/interfaceDAOPersons");

const getPerson = async (objParams) => {
    let = { intId } = objParams;

    let dao = new classInterfacePerson();

    console.log(intId);

    let query = { intId: intId};

    let result = await dao.getPerson(query);

    return result;
};
module.exports = getPerson;