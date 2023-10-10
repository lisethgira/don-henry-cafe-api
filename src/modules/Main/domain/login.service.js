//Lbreria
const validator = require("validator").default;

//Interface
const classInterfaceDAOMain = require("../infra/conectors/interfaceDAOMain")

class Login {
    //Objetc
    #objData
    #objResult

    constructor(data){
        this.#objData = data
        console.log(this.#objData)
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

        this.#objResult={
            error: query.error,
            data: query.data,
            msg: query.msg,
        }
    }

    async #getData(){
        const dao = new classInterfaceDAOMain()
        const query = await dao.getData(this.#objData)

        this.#objResult={
            error: query.error,
            data : query.data
        }
    }
}

module.exports = Login