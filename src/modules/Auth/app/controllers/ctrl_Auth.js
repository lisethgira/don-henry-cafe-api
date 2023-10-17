const serviceLogin = require("../../domain/login.service")
const Register = require("../../domain/register.service");

class ctrlMain{
    async Login(req, res){
        try {
            let data = req.body

            const service = new serviceLogin(data)
    
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
    async Register(req, res){
        try {
            let data = req.body

            const service = new Register(data)
    
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

module.exports = ctrlMain