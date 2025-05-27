const mongoose = require("mongoose");
const Schema = mongoose.Schema;     
const listeningSchema = new Schema({
    title: { 
    type: String,
    required:true,
    },
    description: String,
    image: { 
        filename: String,
        url: String,
//     default: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
//     set: (v) =>
//         v === "" ? "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg" : v,
 },
    price: Number,
    location: String,
    country: String,
});

const listing = mongoose.model("listing", listeningSchema);
module.exports = listing;