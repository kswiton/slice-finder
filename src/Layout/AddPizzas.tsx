import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import AddIngredientDialog from "./AddIngredientDialog";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { IconButton } from "@mui/material";

const AddPizzas = () => {
  const [pizzerias, setPizzerias] = useState<any[]>([]);
  const [chosenPizzeria, setChosenPizzeria] = useState<any | null>(null);
  const [pizzaName, setPizzaName] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [checkedIngredients, setCheckedIngredients] = useState<any[]>([]);
  const [isAddIngredientDialogOpen, setIsAddIngredientDialogOpen] =
    useState(false);
  const [ingredientToAdd, setIngredientToAdd] = useState<any | null>(null);

  const getPizzerias = async () => {
    const response = await axios.get("/api/place");
    setPizzerias(response.data);
  };

  useEffect(() => {
    getPizzerias();
  }, []);

  console.log("checkedIngredients", checkedIngredients);
  const handleChangePizzeria = (event: SelectChangeEvent) => {
    setChosenPizzeria(event.target.value);
  };

  const addIngredient = (ingredient: string) => {
    setIngredientToAdd({
      name: ingredient.charAt(0).toUpperCase() + ingredient.slice(1),
      alternativeNames: "",
      vegetarian: false,
    });
    setIsAddIngredientDialogOpen(true);
  };

  const handleSaveNewIngredient = async () => {
    const altNames = [];
    altNames.push(ingredientToAdd?.name?.trim().toLowerCase());
    if (ingredientToAdd.alternativeNames !== "") {
      altNames.push(
        ...ingredientToAdd.alternativeNames
          .split(",")
          .map((name: string) => name?.trim().toLowerCase())
      );
    }
    const nameToUpperCase =
      ingredientToAdd.name.charAt(0).toUpperCase() +
      ingredientToAdd.name.slice(1);
    const response = await axios.post("/api/addIngredient", {
      alternativeNames: altNames,
      name: nameToUpperCase,
      vegetarian: ingredientToAdd.vegetarian,
    });
    console.log(response);
    setIsAddIngredientDialogOpen(false);
    checkIngredients();
  };

  const findIngredient = async () => {
    const response = await axios.get("/api/findIngredient", {
      params: {
        ingredient: "Tuńczyk ",
      },
    });
    return response.data;
  };

  const addPizza = async () => {
    const response = await axios.post("/api/addpizza", {
      pizzeriaId: chosenPizzeria,
      name: pizzaName,
      ingredients: checkedIngredients.map((ingredient) => ingredient.id),
    });
    console.log(response);
    setPizzaName("");
    setIngredients("");
    setCheckedIngredients([]);
  };

  const checkIngredients = async () => {
    const response = await axios.get("/api/checkIngredients", {
      params: {
        ingredients: ingredients
          ?.split(",")
          .map((ingredient) => ingredient?.trim().toLowerCase()),
      },
    });
    console.log(response);
    setCheckedIngredients(response.data);
  };

  return (
    <>
      <AddIngredientDialog
        open={isAddIngredientDialogOpen}
        handleClose={() => setIsAddIngredientDialogOpen(false)}
        ingredientToAdd={ingredientToAdd}
        setIngredientToAdd={setIngredientToAdd}
        handleSaveNewIngredient={handleSaveNewIngredient}
      />
      <Box sx={{ p: 3, marginBottom: 3 }}>
        <FormControl
          fullWidth
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            marginBottom: 3,
          }}
        >
          <InputLabel id="demo-simple-select-label">Pizzeria</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={chosenPizzeria || ""}
            label="Pizzeria"
            onChange={handleChangePizzeria}
          >
            {pizzerias?.map((pizzeria) => (
              <MenuItem key={pizzeria.id} value={pizzeria.id}>
                {pizzeria.name}
              </MenuItem>
            ))}
          </Select>
          <TextField
            id="outlined-multiline-static"
            label="Nazwa pizzy"
            placeholder="Nazwa pizzy:"
            value={pizzaName}
            onChange={(e) => setPizzaName(e.target.value)}
          />
          <TextField
            id="outlined-multiline-static"
            label="Składniki"
            multiline
            rows={4}
            placeholder="Składniki:"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <Button variant="contained" onClick={checkIngredients}>
            Sprawdź składniki
          </Button>
          {checkedIngredients.length > 0 && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead
                  sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                    borderBottom: "2px solid rgba(0, 0, 0, 0.12)",
                  }}
                >
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Nazwa wprowadzona</TableCell>
                    <TableCell>Nazwa w bazie</TableCell>
                    <TableCell>Nazwy alternatywne</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {checkedIngredients.map((ingredient, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        {ingredient === null ? (
                          <CancelIcon style={{ color: "red" }} />
                        ) : (
                          <CheckCircleIcon style={{ color: "green" }} />
                        )}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {ingredients?.split(",")[index]?.trim()}
                      </TableCell>
                      <TableCell>
                        {ingredient === null
                          ? "Nie znaleziono"
                          : ingredient.name}
                      </TableCell>
                      <TableCell>
                        {ingredient === null ? (
                          <Button
                            variant="contained"
                            onClick={() => {
                              addIngredient(
                                ingredients?.split(",")[index]?.trim()
                              );
                            }}
                          >
                            Dodaj składnik
                          </Button>
                        ) : (
                          ingredient.alternativeNames.join(", ")
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => {
                            setCheckedIngredients(
                              checkedIngredients.filter(
                                (ingredient, i) => i !== index
                              )
                            );
                          }}
                        >
                          <DeleteOutlineIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {checkedIngredients.length === 0 ||
          checkedIngredients.some(
            (ingredient) => ingredient === null
          ) ? null : (
            <Button variant="contained" onClick={addPizza}>
              Dodaj pizzę
            </Button>
          )}
        </FormControl>
      </Box>
    </>
  );
};

export default AddPizzas;
