const classDao = require("../repository/daoAuth")

class interfaceDAOMain{
    async setUser(data){
        const dao = new classDao()
        const res = await dao.setUser(data)
        return res
    }

    async validateUser(data){
        const dao = new classDao()
        const res = await dao.validateUser(data)
        return res
    }

    async getIntIdRoles(data){
        const dao = new classDao()
        const res = await dao.getIntIdRoles(data)
        return res
    }

    async getRolesById(data){
        const dao = new classDao()
        const res = await dao.getRolesById(data)
        return res
    }
    
    async getData(data){
        const dao = new classDao()
        const res = await dao.getUser(data)
        return res
    }
}

module.exports = interfaceDAOMain