const classDao = require("../repository/daoProducts")

class interfaceDAOProducts{

    async setProducts(data){
        const dao = new classDao()
        const res = await dao.setProducts(data)
        return res
    }

    async updateProducts(data){
        const dao = new classDao()
        const res = await dao.updateProducts(data)
        return res
    }

    async getProducts(data){
        const dao = new classDao()
        const res = await dao.getProducts(data)
        return res
    }

    async getProductsByName(data){
        const dao = new classDao()
        const res = await dao.getProductsByName(data)
        return res
    }

    async deleteProducts(data){
        const dao = new classDao()
        const res = await dao.deleteProducts(data)
        return res
    }
}

module.exports = interfaceDAOProducts