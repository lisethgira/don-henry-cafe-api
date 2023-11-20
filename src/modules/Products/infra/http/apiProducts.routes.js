const routes = require("express").Router()

//Class
const classController = require("../../app/controllers/ctrl_Products")

routes.post("/Products/setProducts", async (req, res) => {
    const controllerProducts = new classController()
    await controllerProducts.setProducts(req, res)
})

routes.put("/Products/updateProducts", async (req, res) => {
    const controllerProducts = new classController()
    await controllerProducts.updateProducts(req, res)
})

routes.get("/Products/getProducts", async (req, res) => {
    const controllerProducts = new classController()
    await controllerProducts.getProducts(req, res)
})

routes.delete("/Products/deleteProducts", async (req, res) => {
    const controllerProducts = new classController()
    await controllerProducts.deleteProducts(req, res)
})

module.exports = routes