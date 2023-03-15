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

const HomePage = () => {
  const [pizzaList, setPizzaList] = useState<any[]>([]);
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [hateList, setHateList] = useState<any[]>([]);
  const [loveList, setLoveList] = useState<any[]>([]);
  const [vege, setVege] = useState<boolean>(false);
  const [meat, setMeat] = useState<boolean>(false);
  const [showAllIngredients, setShowAllIngredients] = useState<boolean>(false);

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
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, m: 3 }}>
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
                <Tooltip title="Bleh!" placement="top">
                  <ToggleButton value="hate" aria-label="hate">
                    🤢
                  </ToggleButton>
                </Tooltip>
                <Tooltip title="Whatever" placement="top">
                  <ToggleButton value="ok" aria-label="ok">
                    🙂
                  </ToggleButton>
                </Tooltip>
                <Tooltip title="Must have!" placement="top">
                  <ToggleButton value="love" aria-label="love">
                    😍
                  </ToggleButton>
                </Tooltip>
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
              .filter((pizza: any) => {
                //if meat is true, then filter out pizza with less than 2 ingredients where vegetarian is false
                if (meat) {
                  return (
                    pizza.ingredients.filter(
                      (ingredient: any) => !ingredient.vegetarian
                    ).length >= 3
                  );
                } else {
                  return true;
                }
              })

              .map((pizza: any, index: number) => (
                <Box
                  key={index}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Box>
                    <b>{pizza.name}</b>:{" "}
                    {pizza.ingredients
                      .map((ingredient: any) => ingredient.name)
                      .join(", ")}
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
