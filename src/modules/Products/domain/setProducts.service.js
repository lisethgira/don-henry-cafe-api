//Lbreria
const validator = require("validator").default;

//Interface
const classInterfaceDAOProducts = require("../infra/conectors/interfaceDAOProducts")

class setProducts {
    //Objetc
    #objData
    #objResult

    constructor(data) {
        this.#objData = data
    }

    async main() {
        await this.#validations()
        await this.#setProducts()

        return this.#objResult
    }

    //Validaciones del microservicio
    async #validations() {
        const dao = new classInterfaceDAOProducts()

        if (!this.#objData) {
            throw new Error("Faltan campos requeridos.");
        }

        if (!validator.isEmail(this.#objData?.strEmail)) {
            throw new Error("El campo de email no tiene un formato no valido debe ser tipo email.");
        }

        const queryGetProducts = await dao.getProductsByName({
            strName: this.#objData.strName.trim()
        });

        if (queryGetProducts.error) {
            throw new Error(queryGetProducts.msg)
        }

        if (queryGetProducts.data) {
            throw new Error("Ya existe un producto con este nombre.");
        }
    }

    async #setProducts() {
        const dao = new classInterfaceDAOProducts()
        
        const query = await dao.setProducts({
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

module.exports = setProducts