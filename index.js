const clsServer = require("./src/modules/Main/app/server")

const init = () =>{
    let server = new clsServer();
    server.main()
}

init()