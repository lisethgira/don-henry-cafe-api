//Librerias
const express = require("express")
const app = express()

//Librerias adicionales
const cors =  require("cors")
const morgan = require("morgan")
const helmet = require("helmet");
const compression = require("compression");

//Declaracion de variables globales
app.set("port", process.env.APP_PORT);

//Middlewares
app.use(cors())
app.use(express.json());
app.use(morgan((process.env.ENV = "development" ? "dev" : "common")))
app.use(helmet());
app.use(compression({ level: 9 }));

//Static


//Router
app.use(require("../../Auth/infra/http/apiAuth.routes"))

module.exports = app