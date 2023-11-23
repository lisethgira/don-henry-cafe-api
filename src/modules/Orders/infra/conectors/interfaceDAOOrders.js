const classDao = require("../repository/daoOrders")

class interfaceDAOOrders{

    async setOrders(data){
        const dao = new classDao()
        const res = await dao.setOrders(data)
        return res
    }

    async updateOrders(data){
        const dao = new classDao()
        const res = await dao.updateOrders(data)
        return res
    }

    async getOrders(data){
        const dao = new classDao()
        const res = await dao.getOrders(data)
        return res
    }

    async getOrdersByName(data){
        const dao = new classDao()
        const res = await dao.getOrdersByName(data)
        return res
    }

    async deleteOrders(data){
        const dao = new classDao()
        const res = await dao.deleteOrders(data)
        return res
    }
}

module.exports = interfaceDAOOrders