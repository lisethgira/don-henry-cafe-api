const setPerson = require("../../domain/setPerson.service")
const getPerson = require("../../domain/getPerson.service")
const deletePerson = require("../../domain/deletePerson.service")

class ctrlPersons{
    
    async setPerson(req, res){
        try {
            let data = req.body

            const service = new setPerson(data)
    
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

    async getPerson(req, res){
        try {
            let objParams = req.query
    
            const query = await getPerson(objParams)
    
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

    async deletePerson(req, res){
        try {
            let data = req.body

            const service = new deletePerson(data)
    
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

module.exports = ctrlPersons