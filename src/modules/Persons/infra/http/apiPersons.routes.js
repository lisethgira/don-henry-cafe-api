const routes = require("express").Router()

//Class
const classController = require("../../app/controllers/ctrl_Persons")

routes.post("/Person/setPerson", async (req, res) => {
    const controllerPersons = new classController()
    await controllerPersons.setPerson(req, res)
})

module.exports = routes