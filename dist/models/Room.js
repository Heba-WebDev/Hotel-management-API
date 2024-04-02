import { Schema, model } from "mongoose";
const roomSchema = new Schema({
    name: String,
    roomType: String,
    price: Number,
});
const roomModel = model("rooms", roomSchema);
export { roomModel };
