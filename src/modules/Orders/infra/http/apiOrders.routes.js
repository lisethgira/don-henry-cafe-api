const routes = require("express").Router()

//Class
const classController = require("../../app/controllers/ctrl_Orders")

routes.post("/Orders/setOrders", async (req, res) => {
    const controllerOrders = new classController()
    await controllerOrders.setOrders(req, res)
})

routes.put("/Orders/updateOrders", async (req, res) => {
    const controllerOrders = new classController()
    await controllerOrders.updateOrders(req, res)
})

routes.get("/Orders/getOrders", async (req, res) => {
    const controllerOrders = new classController()
    await controllerOrders.getOrders(req, res)
})

routes.delete("/Orders/deleteOrders", async (req, res) => {
    const controllerOrders = new classController()
    await controllerOrders.deleteOrders(req, res)
})

module.exports = routes