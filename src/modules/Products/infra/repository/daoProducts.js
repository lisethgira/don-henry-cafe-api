//Librerias
const { Client } = require("pg")

//Conexion
const connection = require("../../../../common/config/confPG_connection")

class daoProducts {
    async setProducts(data) {
        try {
            const client = new Client(connection)
            await client.connect()

            const query = `INSERT INTO public."tbl_Products" (
                "strName",
                "Price",
                "strDescription",
                "arrImages",
                "intAmount",
                "bitShipping",
                "bitActivo"
            ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`

            const values = [
                data.strName,
                data.Price,
                data.strDescription,
                data.arrImages,
                data.intAmount,
                data.bitShipping,
                data.bitActivo,
            ]
            
            let response = await client.query(query, values)
            
            await client.end()

            let result = {
                error: false,
                msg:"El producto fue registrado con exito.",
                data: response.rows[0]
            }

            return result
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo setProducts de la clase daoProducts",
            };

            return result;
        }
    }

    async updateProducts(data) {
        try {
            const client = new Client(connection)
            await client.connect()

            const query = `UPDATE public."tbl_Products"
            SET 
                "strName"        = COALESCE($2,"strName"),
                "Price"          = COALESCE($3,"Price"),
                "strDescription" = COALESCE($4,"strDescription"),
                "arrImages"      = COALESCE($5,"arrImages"),
                "intAmount"      = COALESCE($6,"intAmount"),
                "bitShipping"    = COALESCE($7,"bitShipping")
            
            WHERE "intId" = $1 RETURNING *`

            const values = [
                data.intId,
                data.strName,
                data.Price,
                data.strDescription,
                data.arrImages,
                data.intAmount,
                data.bitShipping,
            ]
            
            let response = await client.query(query,values)
            
            await client.end()

            let result = {
                error: false,
                msg:"EL producto fue actualizado con exito.",
                data: response.rows[0]
            }

            return result
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo updateProducts de la clase daoProducts",
            };

            return result;
        }
    }

    async getProducts(data) {
        try {
            const client = new Client(connection)
            await client.connect()

            const query = `
            SELECT *
            FROM public."tbl_Products"
            WHERE ("intId" = $1 OR $1 IS NULL)
            ORDER BY "intId" ASC`

            const values = [
                data.intId || null
            ]
            
            let response = await client.query(query, values)
            
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
                    "Error en el metodo getProducts de la clase daoProducts",
            };

            return result;
        }
    }

    async getProductsByName(data) {
        try {
            const client = new Client(connection)
            await client.connect()

            const query = `
            SELECT *
            FROM public."tbl_Products"
            WHERE ("strName" = $1)`

            const values = [
                data.strName
            ]
            
            let response = await client.query(query, values)
            
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
                    "Error en el metodo getProducts de la clase daoProducts",
            };

            return result;
        }
    }

    async deleteProducts(data) {
        try {
            const client = new Client(connection)
            await client.connect()

            const query = `
            UPDATE public."tbl_Products"
            SET "bitActivo" = COALESCE($2,"bitActivo")
            WHERE "intId" = $1`

            const values = [
                data.intId,
                data.bitActivo
            ]
            
            await client.query(query, values)
            
            await client.end()

            let result = {
                error: false,
                msg:"El producto fue eliminado con exito.",
            }

            return result
        } catch (error) {
            let result = {
                error: true,
                msg:
                    error.message ||
                    "Error en el metodo deleteProducts de la clase daoProducts",
            };

            return result;
        }
    }
}

module.exports = daoProducts