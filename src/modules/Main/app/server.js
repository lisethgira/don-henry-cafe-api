require ("dotenv-flow").config()

const http = require("http")
const https = require('https');

//Modules
const app = require("./index")

class clsServer{
    #objServer;

    async main(){
        await this.#server()
    }

    async #server(){
        this.#objServer = http.createServer(app).listen(app.get("port"))
    }

}

module.exports = clsServer