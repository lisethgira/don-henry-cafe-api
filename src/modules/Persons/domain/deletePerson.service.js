//Lbreria
const validator = require("validator").default;

//Interface
const classInterfaceDAOPersons = require("../infra/conectors/interfaceDAOPersons")

class deletePerson {
    //Objetc
    #objData
    #objResult

    constructor(data) {
        this.#objData = data
    }

    async main() {
        await this.#validations()
        await this.#deletePerson()

        return this.#objResult
    }

    //Validaciones del microservicio
    async #validations() {

        if (!this.#objData.intId) {
            throw new Error("Se esperaban parametros de entrada.");
        }
    }

    async #deletePerson() {
        const dao = new classInterfaceDAOPersons()
        const query = await dao.deletePerson({
            intId: this.#objData.intId,
            bitActivo: false
        })

        if (query.error) {
            throw new Error(query.msg)
        }

        this.#objResult = {
            error: query.error,
            msg: query.msg,
        }
    }
}

module.exports = deletePerson