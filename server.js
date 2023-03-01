const axios = require("axios").default;
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/api/url", (req, res) => {
  res.send("Hello World, from express");
});

app.get("/api/place", async (req, res) => {
  const response = await axios(
    "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=KEY_HERE"
  );
  res.send(response.data);
  fetch();
});

app.listen(8080, () => console.log("API is running on http://localhost:8080/"));
