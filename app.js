const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");
const MONGOOSE_URI = "mongodb://localhost:27017/express-mongoose-recipes-dev";

const app = express();

// MIDDLEWARE
app.use(logger("dev"));
app.use(express.static("public"));
app.use(express.json());

// DATABASE CONNECTION
mongoose
  .connect(MONGOOSE_URI)
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES
//  GET  / route - This is just an example route
app.get("/", (req, res) => {
  res.send("<h1>LAB | Express Mongoose Recipes</h1>");
});

//  Iteration 3 - Create a Recipe route
app.post("/recipes", (req, res) => {
  Recipe.create({
    title: req.body.title,
    instructions: req.body.instructions,
    level: req.body.level,
    ingredients: req.body.ingredients,
    image: req.body.image,
    duration: req.body.duration,
    isArchived: req.body.isArchived,
    creator: req.body.creator,
  })
    .then((createdRecipe) => {
      res.status(201).json(createdRecipe);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error while creating a new recipe" });
    });
});

//  Iteration 4 - Get All Recipes
app.get("/recipes", (req, res) => {
  Recipe.find()
    .then((recipes) => {
      res.status(200).json(recipes);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error while fetching recipes" });
    });
});

//  Iteration 5 - Get a Single Recipe
app.get("/recipes/:id", (req, res) => {
  Recipe.findById(req.params.id)
    .then((recipe) => {
      res.status(200).json(recipe);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error while fetching recipe" });
    });
});

//  Iteration 6 - Update a Single Recipe
app.put("/recipes/:id", (req, res) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedRecipe) => {
      res.status(200).json(updatedRecipe);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error while updating recipe" });
    });
});

//  Iteration 7 - Delete a Single Recipe
app.delete("/recipes/:id", (req, res) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then((deletedRecipe) => {
      res.status(204).json(deletedRecipe);
    })
    .catch((error) => {
      res.status(500).json({ error: "Error while deleting recipe" });
    });
});

// Start the server
app.listen(3000, () => console.log("My first app listening on port 3000!"));

//❗️DO NOT REMOVE THE BELOW CODE
module.exports = app;
