const routes = require("express").Router()

//Class
const classController = require("../../app/controllers/ctrl_Persons")

routes.post("/Person/setPerson", async (req, res) => {
    const controllerPersons = new classController()
    await controllerPersons.setPerson(req, res)
})

routes.get("/Person/getPerson", async (req, res) => {
    const controllerPersons = new classController()
    await controllerPersons.getPerson(req, res)
})

routes.delete("/Person/deletePerson", async (req, res) => {
    const controllerPersons = new classController()
    await controllerPersons.deletePerson(req, res)
})

module.exports = routes