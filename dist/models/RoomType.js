import { Schema, model } from "mongoose";
const RoomTypesSchema = new Schema({
    name: {
        type: String,
        required: true,
        enum: [
            "Single",
            "Double",
            "Triple",
            "Studio",
            "Suite",
            "Presidential Suite",
        ],
    },
});
const roomTypeModel = model("roomType", RoomTypesSchema);
export { roomTypeModel };
