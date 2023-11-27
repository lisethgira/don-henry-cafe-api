//Lbreria
const validator = require("validator").default;
const jwt = require("jsonwebtoken")

//Interface
const classInterfaceDAOMain = require("../infra/conectors/interfaceDAOAuth")

//Services
const serviceGetPerson = require("../../Persons/domain/getPerson.service")

//Functions
const { compare } = require("../app/functions/handleBcrypt")

class Login {
    //Objetc
    #objData
    #objResult
    #objDataUser

    //Variables
    #strNombreRol

    constructor(data){
        this.#objData = data 
    }

    async main(){
        console.log(this.#objData)
        await this.#validations()
        await this.#validateData()

        return this.#objResult
    }

    //Validaciones del microservicio
    async #validations(){
        const dao = new classInterfaceDAOMain()

        if (!this.#objData?.strEmail && !this.#objData?.strPassword){
            throw new Error("Faltan campos requeridos.");
        }

        if (!validator.isEmail(this.#objData?.strEmail)) {
            throw new Error("El campo de Usuario contiene un formato no valido debe ser tipo email.");
        }

        const queryGetUser = await dao.validateUser({strEmail:this.#objData.strEmail});

        if (queryGetUser.error) {
            throw new Error(queryGetUser.msg)
        }

        if (!queryGetUser.data) {
            throw new Error("El usuario ingresado no exite.");
        }
    }

    async #validateData(){
        const dao = new classInterfaceDAOMain()
        const query = await dao.validateUser(this.#objData)

        if (query.error) {
            throw new Error(query.msg)
        }

        const objDataUser = query.data

        const checkPassword = await compare(this.#objData.strPassword, objDataUser.strPassword)

        if (!checkPassword) {
            throw new Error("Contraseña incorrecta")
        }

        await this.#getDataUser(objDataUser.intIdPerson)
        await this.#getRol(objDataUser.intIdRol)

        const secretKey = process.env.KEY_TOKEN

        const token = jwt.sign({
            ...this.#objDataUser,
            strRol:this.#strNombreRol
        },
        secretKey,
        {expiresIn:process.env.TOKEN_EXPIRATION,algorithm: "HS256"})
        
        this.#objResult={
            error: query.error,
            msg: query.msg,
            data: token,
        }

    }

    async #getDataUser(intIdPerson){
        const query = await serviceGetPerson({
            intId:intIdPerson
        })

        if (query.error) {
            throw new Error(query.msg)
        }

        this.#objDataUser = query.data[0]
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

module.exports = Login