//Lbreria
const validator = require("validator").default;

//Interface
const classInterfaceDAOOrders = require("../infra/conectors/interfaceDAOOrders")

class deleteOrders {
    //Objetc
    #objData
    #objResult

    constructor(data) {
        this.#objData = data
    }

    async main() {
        await this.#validations()
        await this.#deleteOrders()

        return this.#objResult
    }

    //Validaciones del microservicio
    async #validations() {
        if (!this.#objData.intId) {
            throw new Error("Se esperaban parametros de entrada.");
        }
    }

    async #deleteOrders() {
        const dao = new classInterfaceDAOOrders()
        const query = await dao.deleteOrders({
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

module.exports = deleteOrders