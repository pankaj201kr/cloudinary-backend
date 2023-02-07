const mongoose = require("mongoose");
const ImageSchema = new mongoose.Schema({
    imageName: { type: String },
    profile_img: { type: String },
    cloudinary_id: { type: String },
    description: { type: String, default: "Image is lovely" },
    views: {
        type: Number,
        default: 0,
    },
    date: { type: String }
});
module.exports = mongoose.model("Image", ImageSchema);