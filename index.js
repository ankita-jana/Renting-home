const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongo_url = "mongodb://127.0.0.1:27017/wanderland";
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, 'public')));

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

app.get("/", (req, res) => {
  res.send("hello here it is!");
});

// index route
app.get("/listings", async (req, res) => {
  const all_listing = await Listing.find({});
  res.render("./listings/index", { all_listing });
});

// new listing form
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// show route for a single listing
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  id = id.trim();
  const listing = await Listing.findById(id); // Renamed from "Listing" to "listing"
  res.render("listings/show.ejs", { listing }); // Renamed from "Listing" to "listing"
});

// add new listing
app.post("/listings", async (req, res) => {
  const new_listing = new Listing(req.body.listing);
  await new_listing.save();
  res.redirect("/listings"); // Redirect to all listings page after adding new listing
});
app.get("/listings/:id/edit", async (req, res) => {
  const { id } = req.params;
  const listingToEdit = await Listing.findById(id);
  res.render("listings/edit", { listing: listingToEdit }); // Render the edit page with the listing data
});
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing }); // Corrected method name: findByIdAndUpdate
  res.redirect(`/listings/${id}`); // Redirect to the updated listing's show page
});

app.delete("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const deleted_listing = await Listing.findByIdAndDelete(id);
  console.log("Deleted Listing:", deleted_listing);
  res.redirect("/listings");
});

app.listen(8080, () => {
  console.log("app is listening to the port 8080");
});
