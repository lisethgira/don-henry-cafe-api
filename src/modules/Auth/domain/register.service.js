//Lbreria
const validator = require("validator").default;
const jwt = require("jsonwebtoken")

//Interface
const classInterfaceDAOMain = require("../infra/conectors/interfaceDAOAuth")

//Sercive
const serviceSetPerson = require("../../Persons/domain/setPerson.service")
const serviceGetPerson = require("../../Persons/domain/getPerson.service")

//Functions
const { encrypt } = require("../app/functions/handleBcrypt")

class Register {
    //Objetc
    #objData
    #objResult
    #objDataPerson

    //Variable
    #intIdPerson
    #intIdRol
    #strNombreRol
    
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

        if (!validator.isEmail(this.#objData?.strEmail)) {
            throw new Error("El campo de Usuario contiene un formato no valido debe ser tipo email.");
        }

        const queryGetUser = await dao.validateUser({
            strUsername: this.#objData.strEmail
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
            strNames: this.#objData?.strNames,
            strLastNames: this.#objData?.strLastNames,
            strEmail: this.#objData?.strEmail,
            strPhoneNumber: this.#objData?.strPhoneNumber,
            strNumberWhatsapp: this.#objData?.strNumberWhatsapp
        })

        const query = await service.main()

        if (query.error) {
            throw new Error(query.msg)
        }

        this.#intIdPerson = query.data.intId
        this.#objDataPerson = query.data
    }

    async #setUser() {
        const dao = new classInterfaceDAOMain()

        const hash = await encrypt(this.#objData.strPassword)

        const query = await dao.setUser({
            intIdPerson: this.#intIdPerson,
            intIdRol: this.#intIdRol,
            strUsername: this.#objData.strEmail,
            strPassword: hash,
        })

        if (query.error) {
            throw new Error(query.msg)
        }

        await this.#getRol(this.#intIdRol)

        const secretKey = process.env.KEY_TOKEN

        const token = jwt.sign({
            ...this.#objDataPerson,
            strRol:this.#strNombreRol
        },
        secretKey,
        {expiresIn:process.env.TOKEN_EXPIRATION,algorithm: "HS256"})

        this.#objResult = {
            error: query.error,
            msg: query.msg,
            data: {
                ...query.data,
                token
            }
        }
    }

    async #getRol(intIdRol){
        const dao = new classInterfaceDAOMain()
        const query = await dao.getRolesById({
            intIdRol:intIdRol
        })

        if (query.error) {
            throw new Error(query.msg)
        }
        
        this.#strNombreRol = query.data.strNombreRol
    }
}

module.exports = Register