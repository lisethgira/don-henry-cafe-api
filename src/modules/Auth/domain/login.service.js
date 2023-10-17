//Lbreria
const validator = require("validator").default;
const jwt = require("jsonwebtoken")

//Interface
const classInterfaceDAOMain = require("../infra/conectors/interfaceDAOAuth")

class Login {
    //Objetc
    #objData
    #objResult
    #objDataUser

    constructor(data){
        this.#objData = data 
    }

    async main(){
        await this.#validations()
        await this.#validateData()
        //await this.#getData()

        return this.#objResult
    }

    //Validaciones del microservicio
    async #validations(){
        const dao = new classInterfaceDAOMain()
        if (!this.#objData?.strUsername && !this.#objData?.strPassword){
            throw new Error("Faltan campos requeridos.");
        }

        if (!validator.isEmail(this.#objData?.strUsername)) {
            throw new Error("El campo de Usuario contiene un formato no valido debe ser tipo email.");
        }

        const queryGetUser = await dao.isExistsUser({strUsername:this.#objData.strUsername});

        if (queryGetUser.error) {
            throw new Error(queryGetUser.msg)
        }

        if (!queryGetUser.data) {
            throw new Error("El usuario ingresado no exite.");
        }
    }

    async #validateData(){
        const dao = new classInterfaceDAOMain()
        const query = await dao.validateUser(this.#objData)

        if (query.error) {
            throw new Error(query.msg)
        }

        this.#objDataUser = query.data
        const secretKey = process.env.KEY_TOKEN

        const token = jwt.sign({
            ...this.#objDataUser
        },
        secretKey,
        {expiresIn:process.env.TOKEN_EXPIRATION,algorithm: "HS256"})
        
        this.#objResult={
            error: query.error,
            msg: query.msg,
            data: token,
        }

    }
}

module.exports = Login