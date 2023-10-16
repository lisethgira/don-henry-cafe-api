const classDao = require("../repository/daoAuth")

class interfaceDAOMain{

    async validateUser(data){
        const dao = new classDao()
        const res = await dao.validateUser(data)
        return res
    }
    
    async getData(data){
        const dao = new classDao()
        const res = await dao.getUser(data)
        return res
    }

    async isExistsUser(data){
        const dao = new classDao()
        const res = await dao.isExistsUser(data)
        return res
    }

}

module.exports = interfaceDAOMain