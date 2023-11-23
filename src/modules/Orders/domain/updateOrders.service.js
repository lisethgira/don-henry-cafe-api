//Lbreria
const validator = require("validator").default;

//Interface
const classInterfaceDAOOrders = require("../infra/conectors/interfaceDAOOrders")

class updateOrders {
    //Objetc
    #objData
    #objResult

    constructor(data) {
        this.#objData = data
    }

    async main() {
        await this.#validations()
        await this.#updateOrders()

        return this.#objResult
    }

    //Validaciones del microservicio
    async #validations() {
        const dao = new classInterfaceDAOOrders()

        if (!this.#objData) {
            throw new Error("No llego el objeto con la información.");
        }

        if (!this.#objData.intId) {
            throw new Error("Falto el identificador del producto a actualizar.");
        }

        if (!validator.isEmail(this.#objData?.strEmail)) {
            throw new Error("El campo de email no tiene un formato no valido debe ser tipo email.");
        }

        const queryGetOrders = await dao.getOrders({
            intId: this.#objData.intId
        });

        if (queryGetOrders.error) {
            throw new Error(queryGetOrders.msg)
        }

        let strNamelastProduct = queryGetOrders.data[0]?.strName

        if (strNamelastProduct.trim() !== this.#objData.strName.trim()) {
            const queryGetOrders = await dao.getOrdersByName({
                strName: this.#objData.strName.trim()
            });
    
            if (queryGetOrders.error) {
                throw new Error(queryGetOrders.msg)
            }
    
            if (queryGetOrders.data) {
                throw new Error("Ya existe un producto con este nombre.");
            }
        }

    }

    async #updateOrders() {
        const dao = new classInterfaceDAOOrders()
        
        const query = await dao.updateOrders({
            ...this.#objData,
            strName:this.#objData.strName.trim(),
            bitActivo:true,
        })

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

module.exports = updateOrders