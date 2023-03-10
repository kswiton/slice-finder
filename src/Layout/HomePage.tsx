import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { Button, Paper } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
const HomePage = () => {
  const [pizzaList, setPizzaList] = useState<any[]>([]);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [hateList, setHateList] = useState<any[]>([]);
  const [loveList, setLoveList] = useState<any[]>([]);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {};
  useEffect(() => {
    axios.get("/api/ingredients").then((response) => {
      console.log("ingredients", response.data);
      setIngredients(response.data);
    });
    axios.get("/api/pizzas").then((response) => {
      console.log("pizzas", response.data);
      setPizzaList(response.data);
    });
  }, [setPizzaList]);

  const successCallback = async (position: any) => {
    const response = await axios.get("/api/place", {
      params: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
    });
    console.log(response);
  };

  const errorCallback = (error: any) => {
    console.log(error);
  };

  const search = () => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };

  const handleLoveHate = (ingredient: any) => {
    if (hateList.includes(ingredient)) {
      setHateList(
        hateList.filter((hateIngredient) => hateIngredient !== ingredient)
      );
      setLoveList([...loveList, ingredient]);
    } else if (loveList.includes(ingredient)) {
      setLoveList(
        loveList.filter((loveIngredient) => loveIngredient !== ingredient)
      );
    } else {
      setHateList([...hateList, ingredient]);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#2196f3",
        background: "linear-gradient(160deg, #2196f3 0%, #1769aa 100%)",
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Button
          onClick={search}
          variant="contained"
          color="warning"
          startIcon={<LocationOnIcon />}
        >
          Search
        </Button>
        <Paper
          sx={{
            p: 3,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 3,
          }}
        >
          {ingredients.map((ingredient, index) => (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ToggleButtonGroup
                value={
                  hateList.includes(ingredient)
                    ? "hate"
                    : loveList.includes(ingredient)
                    ? "love"
                    : "ok"
                }
                exclusive
                onChange={() => {
                  handleLoveHate(ingredient);
                }}
                size="small"
              >
                <ToggleButton value="hate" aria-label="hate">
                  🤢
                </ToggleButton>
                <ToggleButton value="ok" aria-label="ok">
                  🙂
                </ToggleButton>
                <ToggleButton value="love" aria-label="love">
                  😍
                </ToggleButton>
              </ToggleButtonGroup>

              {ingredient.name}
            </Box>
          ))}
        </Paper>
        {pizzaList.length === 0 ? null : (
          <Paper
            sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 }}
          >
            {pizzaList
              .filter((pizza: any) => {
                const pizzaIngredients = pizza.ingredients.map(
                  (ingredient: any) => ingredient.name
                );
                const hateIngredients = hateList.map(
                  (ingredient: any) => ingredient.name
                );
                return !hateIngredients.some((hateIngredient) =>
                  pizzaIngredients.includes(hateIngredient)
                );
              })
              .filter((pizza: any) => {
                const pizzaIngredients = pizza.ingredients.map(
                  (ingredient: any) => ingredient.name
                );
                const loveIngredients = loveList.map(
                  (ingredient: any) => ingredient.name
                );
                return loveIngredients.every((loveIngredient) =>
                  pizzaIngredients.includes(loveIngredient)
                );
              })

              .map((pizza: any, index: number) => (
                <Box key={index}>
                  <b>{pizza.name}</b>:{" "}
                  {pizza.ingredients
                    .map((ingredient: any) => ingredient.name)
                    .join(", ")}
                </Box>
              ))}
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
