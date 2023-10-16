//Librerias
const { Client } = require("pg")

//Conexion
const connection = require("../../../../common/config/confPG_connection")

class daoPersons {
    async setPerson(data) {
        try {
            const client = new Client(connection)
            await client.connect()
            
            let response = await client.query(`
                INSERT INTO public."tbl_Person"
                VALUES (
                    ${data.strNames},
                    ${data.strLastNames},
                    ${data.dtBirthdayDate},
                    ${data.strEmail},
                    ${data.strPhoneNumber},
                )
                RETURNING "intId"`)
            
            await client.end()

            let result = {
                error: false,
                msg:"La persona fue registrada con exito.",
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

    async isExistsPerson(data) {
        try {
            const client = new Client(connection)
            await client.connect()
            let response = await client.query(`
            SELECT *
            FROM public."tbl_Person"
            WHERE "strEmail" = '${data.strEmail}'`)
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
                    "Error en el metodo isExistsUser de la clase daoPersons",
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

module.exports = daoPersons