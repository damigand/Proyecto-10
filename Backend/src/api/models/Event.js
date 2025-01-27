const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema(
    {
        titulo: { type: String, required: true },
        descripcion: { type: String, required: false },
        fecha: { type: Date, required: true },
        ubicacion: { type: String, required: true },
        creador: { type: mongoose.Types.ObjectId, ref: "users", required: true },
        asistentes: [{ type: mongoose.Types.ObjectId, ref: "users" }],
        imagen: { type: String, required: false }
    },
    {
        timestamps: true,
        collection: "events"
    }
);

const Event = mongoose.model("events", eventSchema, "events");

module.exports = Event;
