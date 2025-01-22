require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { connectDB } = require("./src/config/db");

//Cloudinary service
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_secret: process.env.CLOUDINARY_SECRET,
    api_key: process.env.CLOUDINARY_API,
});

//required routers
const userRouter = require("./src/api/routes/user");
const eventRouter = require("./src/api/routes/event");

//App

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

//App routers
app.use("/api/users", userRouter);
app.use("/api/events", eventRouter);

app.use("*", (req, res, next) => {
    return res.status(404).json("Ruta no encontrada.");
});

app.listen(3000, () => {
    console.log("Escuchando en http://localhost:3000");
});
