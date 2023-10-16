const routes = require("express").Router()

//Class
const classController = require("../../app/controllers/ctrl_Auth")

routes.post("/login", async (req, res)=>{
    const controllerMain = new classController()
    await controllerMain.Login(req, res)
})
  
module.exports = routes