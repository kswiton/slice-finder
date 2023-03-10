const axios = require("axios").default;
const express = require("express");
const cors = require("cors");
const app = express();
const users = require("./users.json");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
app.use(cors());

app.get("/api/url", (req, res) => {
  res.send("Hello World, from express");
});

app.get("/api/users/:id", (req, res) => {
  const user = users.find((user) => user.id === req.params.id);
  if (!user) {
    res.status(404).send("User not found");
  }
  res.send(user);
});

app.get("/api/place", async (req, res) => {
  const lat = req.query.latitude;
  const lng = req.query.longitude;
  // console.log(req.query);
  // console.log(lat, lng);
  const response = await axios(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=1500&type=restaurant&keyword=pizza&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
  );
  res.send(response.data);
});

app.get("/api/pizzas", async (req, res) => {
  const pizzas = await prisma.pizza.findMany({
    include: {
      ingredients: true,
    },
  });
  res.send(pizzas);
});

app.get("/api/ingredients", async (req, res) => {
  const ingredients = await prisma.ingredient.findMany();
  res.send(ingredients);
});

app.listen(8080, () => console.log("API is running on http://localhost:8080/"));
