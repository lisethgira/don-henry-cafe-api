const classDao = require("../repository/daoPersons")

class interfaceDAOPersons{

    async setPerson(data){
        const dao = new classDao()
        const res = await dao.setPerson(data)
        return res
    }
    
    async getData(data){
        const dao = new classDao()
        const res = await dao.getUser(data)
        return res
    }

    async isExistsPerson(data){
        const dao = new classDao()
        const res = await dao.isExistsPerson(data)
        return res
    }

}

module.exports = interfaceDAOPersons