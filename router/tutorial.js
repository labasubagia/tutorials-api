const { Router } = require("express");
const TutorialController = require("../controllers/tutorial");

const tutorialRouter = Router();
const controller = TutorialController;

tutorialRouter.post("/", controller.create);

tutorialRouter.get("/", controller.findAll);

tutorialRouter.get("/published", controller.findAllPublished);

tutorialRouter.get("/:id", controller.findOne);

tutorialRouter.put("/:id", controller.update);

tutorialRouter.delete("/:id", controller.delete);

tutorialRouter.delete("/", controller.deleteAll);

module.exports = tutorialRouter;
