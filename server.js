const axios = require("axios").default;
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
app.use(cors());
app.use(bodyParser.json());

app.get("/api/url", (req, res) => {
  res.send("Hello World, from express");
});

app.get("/api/place", async (req, res) => {
  const lat = req.query.latitude;
  const lng = req.query.longitude;
  const response = await prisma.pizzeria.findMany();
  // console.log(req.query);
  // console.log(lat, lng);
  // const response = await axios(
  //   `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${lng}&radius=2500&type=restaurant&keyword=pizza&language=pl&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
  // );
  // await prisma.pizzeria.createMany({
  //   data: response.data.results.map((result) => ({
  //     name: result.name,
  //     address: result.vicinity,
  //     lat: result.geometry.location.lat,
  //     lng: result.geometry.location.lng,
  //     googleId: result.place_id,
  //   })),
  // });
  console.log(response);
  res.send(response);
});

app.get("/api/findIngredient", async (req, res) => {
  const ingredient = req.query.ingredient.trim().toLowerCase();
  const response = await prisma.ingredient.findFirstOrThrow({
    where: {
      alternativeNames: {
        has: ingredient,
      },
    },
  });
  console.log(response);
  res.send(response);
});

app.get("/api/checkIngredients", async (req, res) => {
  const ingredients = req.query.ingredients;
  const response = ingredients.map(async (ingredient) => {
    try {
      const foundIngredient = await prisma.ingredient.findFirst({
        where: {
          alternativeNames: {
            has: ingredient,
          },
        },
      });
      return foundIngredient;
    } catch (error) {
      return null;
    }
  });
  const result = await Promise.all(response);
  const hasCheese = result.find(
    (ingredient) => ingredient.id === "clf2la9kc0000vums6k5lk6u3"
  );
  const hasSauce = result.find(
    (ingredient) => ingredient.id === "clf2la9kc000avumsy9non86m"
  );
  !hasCheese &&
    result.push(
      await prisma.ingredient.findFirst({
        where: { id: "clf2la9kc0000vums6k5lk6u3" },
      })
    );
  !hasSauce &&
    result.push(
      await prisma.ingredient.findFirst({
        where: { id: "clf2la9kc000avumsy9non86m" },
      })
    );

  res.send(result);
});

app.get("/api/addCheeseAndSauce", async (req, res) => {
  const pizzasWithoutSauce = await prisma.pizza.findMany({
    where: {
      ingredients: {
        none: {
          id: "clf2la9kc000avumsy9non86m",
        },
      },
    },
  });
  pizzasWithoutSauce.forEach(async (pizza) => {
    await prisma.pizza.update({
      where: { id: pizza.id },
      data: {
        ingredients: {
          connect: {
            id: "clf2la9kc000avumsy9non86m",
          },
        },
      },
    });
  });
  const pizzasWithoutCheese = await prisma.pizza.findMany({
    where: {
      ingredients: {
        none: {
          id: "clf2la9kc0000vums6k5lk6u3",
        },
      },
    },
  });
  pizzasWithoutCheese.forEach(async (pizza) => {
    await prisma.pizza.update({
      where: { id: pizza.id },
      data: {
        ingredients: {
          connect: {
            id: "clf2la9kc0000vums6k5lk6u3",
          },
        },
      },
    });
  });
});

app.post("/api/addIngredient", async (req, res) => {
  const ingredient = req.body;
  const newIngredient = await prisma.ingredient.create({
    data: {
      ...ingredient,
    },
  });
  res.send(newIngredient);
});

app.post("/api/addpizza", async (req, res) => {
  const pizza = req.body;
  console.log(pizza);
  const newPizza = await prisma.pizza.create({
    data: {
      name: pizza.name.trim(),
      ingredients: {
        connect: pizza.ingredients.map((ingredientId) => ({
          id: ingredientId,
        })),
      },
      pizzeriaId: pizza.pizzeriaId,
    },
  });
  res.send(newPizza);
});

app.get("/api/pizzas", async (req, res) => {
  const pizzas = await prisma.pizza.findMany({
    include: {
      ingredients: true,
      Pizzeria: true,
    },
  });
  res.send(pizzas);
});

app.get("/api/ingredients", async (req, res) => {
  const ingredients = await prisma.ingredient.findMany();
  res.send(ingredients);
});

app.listen(8080, () => console.log("API is running on http://localhost:8080/"));
