const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());

const mediaRoutes = require("./routes/media");//LookBook
const CPRoutes = require("./routes/CP");//Campain


const new1Routes = require("./routes/new1");
const new2Routes = require("./routes/new2");



const video1Routes = require("./routes/video1");
const video2Routes = require("./routes/video2");
const video3Routes = require("./routes/video3");
const video4Routes = require("./routes/video4");
const video5Routes = require("./routes/video5");

app.use("/api/v1/media", mediaRoutes);
app.use("/api/v1/CP", CPRoutes);

app.use("/api/v1/new1", new1Routes);
app.use("/api/v1/new2", new2Routes);

app.use("/api/v1/video1", video1Routes);
app.use("/api/v1/video2", video2Routes);
app.use("/api/v1/video3", video3Routes);
app.use("/api/v1/video4", video4Routes);
app.use("/api/v1/video5", video5Routes);



app.use("/public", express.static(path.join(__dirname, "public")));




const mongodbUri = "mongodb+srv://nggiang141:Agera141@cluster0.jtm6pn2.mongodb.net/uploadproject";

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongodb...");
});

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to mongo", err);
});

app.listen(4000, () => {
  console.log("App is running on PORT 4000");
});

// module.exports = app;