//Librerias
const { Client } = require("pg")

//Conexion
const connection = require("../../../../common/config/confPG_connection")

class daoAuth {
    async setUser(data) {
        try {
            const client = new Client(connection)
            await client.connect()

            let response = await client.query(`
                INSERT INTO public."tbl_Users"
                VALUES (
                    ${data.intIdPersona},
                    ${data.intIdRol},
                    ${data.strUsername},
                    ${data.strPassword},
                )
                RETURNING intId`)

            await client.end()

            let result = {
                error: false,
                msg: "El usuario se registro correctamente.",
                data: response.rows[0]
            }

            return result
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setPerson de la clase daoPersons",
            };

            return result;
        }
    }

    async validateUser(data) {
        try {
            const client = new Client(connection)
            await client.connect()
            let response = await client.query(`
            SELECT * 
            FROM public."tbl_Users" 
            WHERE "strUsername" = '${data.strUsername}'
            AND "strPassword" = '${data.strPassword}'`)
            await client.end()
            let result = {
                error: false,
                msg: "el usuario se ha logueado correctamente.",
                data: response.rows[0],
            }

            return result
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo validateUser de la clase daoAuth",
            };

            return result;
        }
    }

    async isExistsUser(data) {
        try {
            const client = new Client(connection)
            await client.connect()
            let response = await client.query(`
            SELECT *
            FROM public."tbl_Users"     
            WHERE "strUsername" = '${data.strUsername}'`)
            await client.end()
            let result = {
                error: false,
                data: response.rows[0]
            }

            return result
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo isExistsUser de la clase daoAuth",
            };

            return result;
        }
    }

    async getIntIdRoles() {
        try {
            const client = new Client(connection)
            await client.connect()
            let response = await client.query(`
            SELECT * 
            FROM public."tbl_Roles" 
            WHERE "strNombreRol" = '${data.strNombreRol}'`)
            await client.end()
            let result = {
                error: false,
                data: response.rows[0],
            }

            return result
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo validateUser de la clase daoAuth",
            };

            return result;
        }
    }

    async getUser(data) {
        const client = new Client(connection)
        await client.connect()
        let response = await client.query("SELECT NOW() as now")

        await client.end()

        let result = {
            error: false,
            data: response.rows[0]
        }

        return result
    }

}

module.exports = daoAuth