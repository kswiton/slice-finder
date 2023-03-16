import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "axios";
import { useQuery, useMutation } from "react-query";
import { Button, IconButton, Paper } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Chip from "@mui/material/Chip";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface Pizzeria {
  id: string;
  name: string;
  address: string;
  pizzas: Pizza[];
  googleId: string;
  lat: number;
  lng: number;
}

interface Ingredient {
  id: string;
  name: string;
  alternativeNames: string[];
  vegetarian: boolean;
  pizzas: Pizza[];
}

interface Pizza {
  id: string;
  name: string;
  ingredients: Ingredient[];
  pizzeriaId: string;
  Pizzeria: Pizzeria;
}

const HomePage = () => {
  const [pizzaList, setPizzaList] = useState<any[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [hateList, setHateList] = useState<Ingredient[]>([]);
  const [loveList, setLoveList] = useState<Ingredient[]>([]);
  const [vege, setVege] = useState<boolean>(false);
  const [meat, setMeat] = useState<boolean>(false);
  const [showAllIngredients, setShowAllIngredients] = useState<boolean>(false);
  const [hideCheeseAndSauce, setHideCheeseAndSauce] = useState<boolean>(true);

  console.log(pizzaList);
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {};
  useEffect(() => {
    axios.get("/api/ingredients").then((response) => {
      setIngredients(response.data);
    });
    axios.get("/api/pizzas").then((response) => {
      setPizzaList(response.data);
    });
  }, [setPizzaList]);

  const toggleVege = () => {
    setMeat(false);
    setVege(!vege);
  };

  const toggleMeat = () => {
    setVege(false);
    setMeat(!meat);
  };

  useEffect(() => {
    vege
      ? setHateList(ingredients.filter((ingredient) => !ingredient.vegetarian))
      : setHateList([]);
  }, [vege, ingredients]);

  const successCallback = async (position: any) => {
    const response = await axios.get("/api/place", {
      params: {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      },
    });
  };

  const errorCallback = (error: any) => {
    console.log(error);
  };

  const search = () => {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };

  const handleLoveHate = (ingredient: Ingredient) => {
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

  const ingredientsToShow = showAllIngredients
    ? ingredients
    : ingredients.slice(0, 8);

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          m: 3,
          minWidth: "80%",
        }}
      >
        {/* <Button
          onClick={search}
          variant="contained"
          color="warning"
          startIcon={<LocationOnIcon />}
        >
          Search
        </Button> */}
        <Paper
          sx={{
            p: 3,
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 3,
          }}
        >
          <FormControlLabel
            sx={{ gridColumn: "1/1" }}
            control={<Switch checked={vege} onChange={toggleVege} />}
            label="Wegetariańska"
          />
          <Tooltip title="Co najmniej 3 mięsne składniki" placement="top">
            <FormControlLabel
              sx={{ gridColumn: "2/2" }}
              control={<Switch checked={meat} onChange={toggleMeat} />}
              label="Mięsna"
            />
          </Tooltip>
          <Button
            sx={{ gridColumn: "3/4", textTransform: "none" }}
            variant="outlined"
            onClick={() => setShowAllIngredients(!showAllIngredients)}
          >
            {showAllIngredients ? "Pokaż mniej" : "Pokaż wszystkie"}
          </Button>
          {ingredientsToShow.map((ingredient, index) => (
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
                <ToggleButton
                  value="hate"
                  aria-label="hate"
                  // sx={{ padding: 0 }}
                >
                  <Tooltip title="Bleh!" placement="top">
                    <span style={{ fontSize: "1rem" }}>🤢</span>
                  </Tooltip>
                </ToggleButton>
                <ToggleButton value="ok" aria-label="ok">
                  <Tooltip title="Whatever" placement="top">
                    <span style={{ fontSize: "1rem" }}>🙂</span>
                  </Tooltip>
                </ToggleButton>
                <ToggleButton value="love" aria-label="love">
                  <Tooltip title="Must have!" placement="top">
                    <span style={{ fontSize: "1rem" }}>😍</span>
                  </Tooltip>
                </ToggleButton>
              </ToggleButtonGroup>

              {ingredient.name}
            </Box>
          ))}
          {showAllIngredients ? null : (
            <Box>
              <IconButton
                onClick={() => setShowAllIngredients(!showAllIngredients)}
              >
                <MoreHorizIcon />
              </IconButton>
            </Box>
          )}
        </Paper>
        {pizzaList.length === 0 ? null : (
          <Paper
            sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 }}
          >
            <Box sx={{ borderBottom: "1px solid #000", paddingBottom: 1 }}>
              <Tooltip
                title={
                  hideCheeseAndSauce
                    ? "Pokaż ser mozzarella i sos pomidorowy"
                    : "Schowaj ser mozzarella i sos pomidorowy"
                }
                placement="top"
              >
                <IconButton
                  onClick={() => setHideCheeseAndSauce(!hideCheeseAndSauce)}
                >
                  {hideCheeseAndSauce ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </IconButton>
              </Tooltip>
            </Box>
            {pizzaList
              .filter((pizza: Pizza) => {
                const pizzaIngredients = pizza.ingredients.map(
                  (ingredient: Ingredient) => ingredient.name
                );
                const hateIngredients = hateList.map(
                  (ingredient: Ingredient) => ingredient.name
                );
                return !hateIngredients.some((hateIngredient) =>
                  pizzaIngredients.includes(hateIngredient)
                );
              })
              .filter((pizza: Pizza) => {
                const pizzaIngredients = pizza.ingredients.map(
                  (ingredient: Ingredient) => ingredient.name
                );
                const loveIngredients = loveList.map(
                  (ingredient: Ingredient) => ingredient.name
                );
                return loveIngredients.every((loveIngredient) =>
                  pizzaIngredients.includes(loveIngredient)
                );
              })
              .filter((pizza: Pizza) => {
                //if meat is true, then filter out pizza with less than 3 ingredients where vegetarian is false
                if (meat) {
                  return (
                    pizza.ingredients.filter(
                      (ingredient: Ingredient) => !ingredient.vegetarian
                    ).length >= 3
                  );
                } else {
                  return true;
                }
              })

              .map((pizza: Pizza, index: number) => (
                <Box
                  key={index}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Box>
                    <b>{pizza.name}</b>:{" "}
                    {pizza.ingredients
                      .map((ingredient: Ingredient) => ingredient.name)
                      .sort(
                        //"ser" and "sos" should be first then the rest should be sorted alphabetically
                        (a: string, b: string) =>
                          a === "Ser" || a.startsWith("Sos")
                            ? -1
                            : b === "Ser" || b.startsWith("Sos")
                            ? 1
                            : a.localeCompare(b)
                      )
                      .filter((ingredientName: string) => {
                        if (hideCheeseAndSauce) {
                          return (
                            !(ingredientName === "Ser") &&
                            !(ingredientName === "Sos")
                          );
                        } else {
                          return true;
                        }
                      })
                      .join(", ") || "..."}
                  </Box>
                  <Chip
                    label={pizza.Pizzeria.name}
                    onClick={() => {
                      //open new tab
                      const win = window.open(
                        `https://www.google.com/maps/place/?q=place_id:${pizza.Pizzeria.googleId}`,
                        "_blank"
                      );
                      win?.focus();
                    }}
                  />
                </Box>
              ))}
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
