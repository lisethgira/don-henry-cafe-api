const setPerson = require("../../domain/setPerson.service")

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
}

module.exports = ctrlPersons