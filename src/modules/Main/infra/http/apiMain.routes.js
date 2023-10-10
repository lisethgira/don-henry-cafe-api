const routes = require("express").Router()

//Class
const classController = require("../../app/controllers/ctrl_Main")

routes.post("/login", async (req, res)=>{
    const controllerMain = new classController()
    await controllerMain.getData(req, res)
})

module.exports = routes