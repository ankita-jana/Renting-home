const mongoose = require("mongoose");
const init_data = require("./data.js");
const listing = require("../models/listing.js");
const mongo_url = "mongodb://127.0.0.1:27017/wanderland";

main()
.then(() => {
    console.log("connected to db");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(mongo_url);
}
const init_db = async() => {
   await listing.deleteMany({});
   await listing.insertMany(init_data.data);
   console.log("data was initialized");
};
init_db();