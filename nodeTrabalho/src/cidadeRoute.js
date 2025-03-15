const cidadeController = require("./cidadeController")

module.exports = (app) => {
        app.post("/cidade", cidadeController.post);
        app.put("/cidade/:id", cidadeController.put);
        app.delete("/cidade/:id", cidadeController.delete);
        app.get("/cidade", cidadeController.get);
        app.get("/cidade/:id", cidadeController.getById);
}