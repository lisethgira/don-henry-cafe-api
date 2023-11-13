//Lbreria
const validator = require("validator").default;

//Interface
const classInterfaceDAOMain = require("../infra/conectors/interfaceDAOAuth")

//Sercive
const serviceSetPerson = require("../../Persons/domain/setPerson.service")

class Register {
    //Objetc
    #objData
    #objResult

    //Variable
    #intIdPerson
    #intIdRol
    
    constructor(data) {
        this.#objData = data
    }

    async main() {
        await this.#validations()
        await this.#getIdRoles()
        await this.#setPerson()
        await this.#setUser()

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

        const queryGetUser = await dao.isExistsUser({
            strUsername: this.#objData.strUsername
        });

        if (queryGetUser.error) {
            throw new Error(queryGetUser.msg)
        }

        if (queryGetUser.data) {
            throw new Error("El correo ingresado ya existe en nuestra base de datos.");
        }
    }

    async #getIdRoles() {
        const dao = new classInterfaceDAOMain()

        const query = await dao.getIntIdRoles({
            strNombreRol: "Cliente"
        })

        if (query.error) {
            throw new Error(query.msg)
        }

        this.#intIdRol = query.data.intId
    }

    async #setPerson() {
        const service = new serviceSetPerson({
            strEmail: this.#objData?.strUsername,
            strPhoneNumber: this.#objData?.strPhoneNumber
        })

        const query = await service.main()

        if (query.error) {
            throw new Error(query.msg)
        }

        this.#intIdPerson = query.data.intId
    }

    async #setUser() {
        const dao = new classInterfaceDAOMain()

        const query = await dao.setUser({
            intIdPersona: this.#intIdPerson,
            intIdRol: this.#intIdRol,
            strUsername: this.#objData.strUsername,
            strPassword: this.#objData.strPassword,
        })

        if (query.error) {
            throw new Error(query.msg)
        }

        this.#objResult = {
            error: query.error,
            msg: query.msg,
            data: query.data
        }
    }
}

module.exports = Register