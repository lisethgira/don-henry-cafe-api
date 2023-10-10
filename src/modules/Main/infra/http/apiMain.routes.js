const routes = require("express").Router()

//Class
const classController = require("../../app/controllers/ctrl_Main")

routes.post("/login", async (req, res)=>{
    const controllerMain = new classController()
    await controllerMain.getData(req, res)
})


routers.get("/", (req, res) => {
    res.status(200).json({
      status: 200,
      msg: "Welcome to Rest API Don Henry Café app!",
      contributors: [
        {
          alias: "lisethgira",
          github: "https://github.com/lisethgira",
        },
        {
          alias: "Josed1804",
          github: "https://github.com/Josed1804",
        },
        {
          alias: "ESCUDERO457",
          github: "https://github.com/ESCUDERO457",
        },
        {
          alias: "frankc2812",
          github: "https://github.com/frankc2812",
        },
      ],
    });
  });
  
module.exports = routes