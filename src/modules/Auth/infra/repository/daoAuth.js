//Librerias
const { Client } = require("pg")

//Conexion
const connection = require("../../../../common/config/confPG_connection")

class daoAuth {
    async setUser(data) {
        try {
            const client = new Client(connection)
            await client.connect()

            const query = `INSERT INTO public."tbl_Users"(
                "intIdPerson",
                "intIdRol",
                "strUsername",
                "strPassword"
                ) VALUES ($1, $2, $3, $4) RETURNING *`

            const values = [
                data.intIdPerson,
                data.intIdRol,
                data.strUsername,
                data.strPassword,
            ]
            
            let response = await client.query(query, values)

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

            const query = `
                SELECT *
                FROM public."tbl_Users"
                WHERE ("strUsername" = $1)
            `

            const values = [data.strEmail]

            let response = await client.query(query,values)

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

    async getIntIdRoles(data) {
        try {
            const client = new Client(connection)

            await client.connect()

            const query = `
                SELECT *
                FROM public."tbl_Roles"
                WHERE ("strNombreRol" = $1)
            `

            const values = [data.strNombreRol]

            let response = await client.query(query,values)

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

    async getRolesById(data) {
        try {
            const client = new Client(connection)

            await client.connect()

            const query = `
                SELECT *
                FROM public."tbl_Roles"
                WHERE ("intId" = $1)
            `

            const values = [data.intIdRol]

            let response = await client.query(query,values)

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