//Lbreria
const validator = require("validator").default;

//Interface
const classInterfaceDAOProducts = require("../infra/conectors/interfaceDAOProducts")

class deleteProducts {
    //Objetc
    #objData
    #objResult

    constructor(data) {
        this.#objData = data
    }

    async main() {
        await this.#validations()
        await this.#deleteProducts()

        return this.#objResult
    }

    //Validaciones del microservicio
    async #validations() {
        if (!this.#objData.intId) {
            throw new Error("Se esperaban parametros de entrada.");
        }
    }

    async #deleteProducts() {
        const dao = new classInterfaceDAOProducts()
        const query = await dao.deleteProducts({
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

module.exports = deleteProducts