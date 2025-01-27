const userRouter = require("express").Router();
const controller = require("../controllers/user");
const { isAuth } = require("../../middlewares/auth");
const { uploadImg } = require("../../middlewares/cloudinary");

const uploadAvatar = uploadImg("user_avatars", 300, 300).single("avatar");

userRouter.get("/", controller.getAllUsers);
userRouter.get("/:id", controller.getUserById);
userRouter.post("/register", controller.register);
userRouter.post("/login", controller.login);
userRouter.post("/avatar", isAuth, uploadAvatar, controller.changeAvatar);
userRouter.post("/password", isAuth, controller.changePassword);
userRouter.put("/edit/:id", isAuth, controller.editUser);
userRouter.delete("/avatar", isAuth, controller.removeAvatar);
userRouter.delete("/delete/:id", isAuth, controller.deleteUser);

module.exports = userRouter;
