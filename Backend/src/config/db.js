const mongoose = require("mongoose");

const connectDB = () => {
    try {
        mongoose.connect(process.env.DB_URL);
        console.log("Base de datos conectada");
    } catch (error) {
        console.log(`Error al conectar con la base de datos: ${error}`)
    }
}

module.exports = { connectDB }