const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.DB_NAME}",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Create a schema
const notesSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

// Create a model
const Note = mongoose.model("Note", notesSchema);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", async function (req, res) {
  let newNote = new Note({
    name: req.body.name,
    age: req.body.age,
  });
  // newNote.save();
  // res.redirect("/");

  try {
    await newNote.save();
    res.redirect("/");
  } catch (err) {
    console.error("Error saving note:", err);
    res.status(500).send("Server Error");
  }
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});
