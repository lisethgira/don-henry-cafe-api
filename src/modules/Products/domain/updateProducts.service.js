//Lbreria
const validator = require("validator").default;

//Interface
const classInterfaceDAOProducts = require("../infra/conectors/interfaceDAOProducts")

class updateProducts {
    //Objetc
    #objData
    #objResult

    constructor(data) {
        this.#objData = data
    }

    async main() {
        await this.#validations()
        await this.#updateProducts()

        return this.#objResult
    }

    //Validaciones del microservicio
    async #validations() {
        const dao = new classInterfaceDAOProducts()

        if (!this.#objData) {
            throw new Error("No llego el objeto con la información.");
        }

        if (!this.#objData.intId) {
            throw new Error("Falto el identificador del producto a actualizar.");
        }

        if (!validator.isEmail(this.#objData?.strEmail)) {
            throw new Error("El campo de email no tiene un formato no valido debe ser tipo email.");
        }

        const queryGetProducts = await dao.getProducts({
            intId: this.#objData.intId
        });

        if (queryGetProducts.error) {
            throw new Error(queryGetProducts.msg)
        }

        let strNamelastProduct = queryGetProducts.data[0]?.strName

        if (strNamelastProduct.trim() !== this.#objData.strName.trim()) {
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

    }

    async #updateProducts() {
        const dao = new classInterfaceDAOProducts()
        
        const query = await dao.updateProducts({
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

module.exports = updateProducts