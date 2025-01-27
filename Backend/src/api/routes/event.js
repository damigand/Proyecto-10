const eventRouter = require("express").Router();
const controller = require("../controllers/event");
const { isAuth } = require("../../middlewares/auth");
const { uploadImg } = require("../../middlewares/cloudinary");

const uploadImage = uploadImg("event_images").single("image");

eventRouter.get("/", controller.getAllEvents);
eventRouter.get("/:id", controller.getEventById);
eventRouter.get("/user/:id", controller.getUserEvents);
eventRouter.post("/create", uploadImage, isAuth, controller.createEvent);
eventRouter.post("/attend/:id", isAuth, controller.attendEvent);
eventRouter.put("/edit/:id", uploadImage, isAuth, controller.editEvent);
eventRouter.delete("/delete/:id", isAuth, controller.deleteEvent);

module.exports = eventRouter;
