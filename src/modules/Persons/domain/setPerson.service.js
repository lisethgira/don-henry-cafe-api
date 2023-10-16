//Lbreria
const validator = require("validator").default;

//Interface
const classInterfaceDAOPersons = require("../infra/conectors/interfaceDAOPersons")

class setPerson {
    //Objetc
    #objData
    #objResult

    constructor(data) {
        this.#objData = data
    }

    async main() {
        await this.#validations()
        await this.#setPerson()
        //await this.#getData()

        return this.#objResult
    }

    //Validaciones del microservicio
    async #validations() {
        const dao = new classInterfaceDAOPersons()

        if (!this.#objData) {
            throw new Error("Faltan campos requeridos.");
        }

        if (!validator.isEmail(this.#objData?.strEmail)) {
            throw new Error("El campo de email no tiene un formato no valido debe ser tipo email.");
        }

        const queryGetPerson = await dao.isExistsPerson({
            strEmail: this.#objData.strEmail
        });

        if (queryGetPerson.error) {
            throw new Error(queryGetPerson.msg)
        }

        if (queryGetPerson.data) {
            throw new Error("El correo ingresado ya existe en nuestra base de datos.");
        }
    }

    async #setPerson() {
        const dao = new classInterfaceDAOPersons()
        const query = await dao.setPerson(this.#objData)

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

module.exports = setPerson