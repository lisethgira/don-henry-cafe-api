const setProducts = require("../../domain/setProducts.service")
const updateProducts = require("../../domain/updateProducts.service")
const getProducts = require("../../domain/getProducts.service")
const deleteProducts = require("../../domain/deleteProducts.service")

class ctrlProducts{
    
    async setProducts(req, res){
        try {
            let data = req.body

            const service = new setProducts(data)
    
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

    async updateProducts(req, res){
        try {
            let data = req.body

            const service = new updateProducts(data)
    
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

    async getProducts(req, res){
        try {
            let objParams = req.query
    
            const query = await getProducts(objParams)
    
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

    async deleteProducts(req, res){
        try {
            let data = req.body

            const service = new deleteProducts(data)
    
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

module.exports = ctrlProducts