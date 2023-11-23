const setOrders = require("../../domain/setOrders.service")
const updateOrders = require("../../domain/updateOrders.service")
const getOrders = require("../../domain/getOrders.service")
const deleteOrders = require("../../domain/deleteOrders.service")

class ctrlOrders{
    
    async setOrders(req, res){
        try {
            let data = req.body

            const service = new setOrders(data)
    
            const query = await service.main()
    
            if (query.error) {
                throw new Error(query.msg)
            }
    
            res.status(200).json(query)
        } catch (error) {
            let result = {
                error: true,
                msg: error.message,
            };

            res.status(400).json(result);
        }
    }

    async updateOrders(req, res){
        try {
            let data = req.body

            const service = new updateOrders(data)
    
            const query = await service.main()
    
            if (query.error) {
                throw new Error(query.msg)
            }
    
            res.status(200).json(query)
        } catch (error) {
            let result = {
                error: true,
                msg: error.message,
            };

            res.status(400).json(result);
        }
    }

    async getOrders(req, res){
        try {
            let objParams = req.query
    
            const query = await getOrders(objParams)
    
            if (query.error) {
                throw new Error(query.msg)
            }
    
            res.status(200).json(query)
        } catch (error) {
            let result = {
                error: true,
                msg: error.message,
            };

            res.status(400).json(result);
        }
    }

    async deleteOrders(req, res){
        try {
            let data = req.body

            const service = new deleteOrders(data)
    
            const query = await service.main()
    
            if (query.error) {
                throw new Error(query.msg)
            }
    
            res.status(200).json(query)
        } catch (error) {
            let result = {
                error: true,
                msg: error.message,
            };

            res.status(400).json(result);
        }
    }
}

module.exports = ctrlOrders