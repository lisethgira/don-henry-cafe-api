//Lbreria
const validator = require("validator").default;

//Interface
const classInterfaceDAOMain = require("../infra/conectors/interfaceDAOAuth")

//Sercive
const serviceSetPerson = require("../../Persons/domain/setPerson.service")

class Login {
    //Objetc
    #objData
    #objResult

    //Variable
    #intIdPerson

    constructor(data) {
        this.#objData = data
    }

    async main() {
        await this.#validations()
        await this.#setPerson()
        await this.#validateData()
        //await this.#getData()

        return this.#objResult
    }

    //Validaciones del microservicio
    async #validations() {
        const dao = new classInterfaceDAOMain()

        if (!this.#objData) {
            throw new Error("Faltan campos requeridos.");
        }

        if (!validator.isEmail(this.#objData?.strUsername)) {
            throw new Error("El campo de Usuario contiene un formato no valido debe ser tipo email.");
        }

        const queryGetUser = await dao.isExistsUser({ strUsername: this.#objData.strUsername });

        if (queryGetUser.error) {
            throw new Error(queryGetUser.msg)
        }

        if (queryGetUser.data) {
            throw new Error("El correo ingresado ya existe en nuestra base de datos.");
        }
    }

    async #setPerson() {
        const service = new serviceSetPerson({
            strEmail:this.#objData?.strUsername,
            strPhoneNumber:this.#objData?.strPhoneNumber
        })

        const query = await service.main()

        if (query.error) {
            throw new Error(query.msg)
        }

        this.#intIdPerson = query.data.intId
    }

    async #validateData() {
        const dao = new classInterfaceDAOMain()
        const query = await dao.validateUser(this.#objData)

        if (query.error) {
            throw new Error(query.msg)
        }

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        }
    }
}

module.exports = Login