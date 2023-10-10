//Librerias
const {Client} = require("pg")


//Conexion
const connection = require("../../../../common/config/confPG_connection")

class daoMain{
    async validateUser(data){
        try {
            const client = new Client(connection)
            await client.connect()
            let response = await client.query(`
            SELECT * 
            FROM public."tbl_Users" 
            WHERE "strUsername" = '${data.strUsername}'
            AND "strPassword" = '${data.strPassword}'`)
            await client.end()
        let result={
            error : false,
            data : response.rows[0]
        }

        return result
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo validateUser de la clase daoMain",
            };

            return result;
        }
    }

    async isExistsUser(data){
        try {
            const client = new Client(connection)
            await client.connect()
            let response = await client.query(`
            SELECT *
            FROM public."tbl_Users"     
            WHERE "strUsername" = '${data.strUsername}'`)
            await client.end()
        let result={
            error : false,
            data : response.rows[0]
        }

        return result
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo isExistsUser de la clase daoMain",
            };

            return result;
        }
    }

    async getUser(data){
        const client = new Client(connection)
        await client.connect()
        let response = await client.query("SELECT NOW() as now")

        await client.end()

        let result={
            error : false,
            data : response.rows[0]
        }

        return result
    }

}

module.exports = daoMain