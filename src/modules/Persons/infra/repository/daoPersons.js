//Librerias
const { Client } = require("pg")

//Conexion
const connection = require("../../../../common/config/confPG_connection")

class daoPersons {
    async setPerson(data) {
        console.log(data)
        try {
            const client = new Client(connection)
            await client.connect()

            const query = `INSERT INTO public."tbl_Person" (
                "strNames",
                "strLastNames",
                "dtBirthdayDate",
                "strEmail",
                "strPhoneNumber",
                "bitActivo"
            ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`

            const values = [
                data.strNames,
                data.strLastNames,
                data.dtBirthdayDate,
                data.strEmail,
                data.strPhoneNumber,
                data.bitActivo,
            ]
            
            let response = await client.query(query, values)
            
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

    async updatePerson(data) {
        try {
            const client = new Client(connection)
            await client.connect()
            
            let response = await client.query(`
                UPDATE public."tbl_Person"
                SET 
                    "strNames"       = COALESCE(${data.strNames},"strNames"),
                    "strLastNames"   = COALESCE(${data.strLastNames},"strLastNames"),
                    "dtBirthdayDate" = COALESCE(${data.dtBirthdayDate},"dtBirthdayDate"),
                    "strEmail"       = COALESCE(${data.strEmail},"strEmail"),
                    "strPhoneNumber" = COALESCE(${data.strPhoneNumber},"strPhoneNumber")
                
                WHERE "intId" = ${data.intId}`)
            
            await client.end()

            let result = {
                error: false,
                msg:"La persona fue actualizada con exito.",
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

    async getPerson(data) {
        try {
            const client = new Client(connection)
            await client.connect()
            
            let response = await client.query(`
                SELECT *
                FROM public."tbl_Person"
                WHERE ("intId" = ${data.intId || null} OR ${data.intId || null} IS NULL)
                AND ("bitActivo" = true)
                ORDER BY "intId" ASC`)
            
            await client.end()

            let result = {
                error: false,
                data: response.rows
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

    async deletePerson(data) {
        try {
            const client = new Client(connection)
            await client.connect()
            
            await client.query(`
                UPDATE public."tbl_Person"
                SET "bitActivo" = COALESCE(${data.bitActivo},"bitActivo")
                WHERE "intId" = ${data.intId}`)
            
            await client.end()

            let result = {
                error: false,
                msg:"La persona fue eliminada con exito.",
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