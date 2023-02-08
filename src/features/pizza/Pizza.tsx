import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/system/Box";
import Stack from "@mui/system/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import classes from "./Pizza.module.css";
import {
  addIngredient,
  removeIngredient,
  removeAllIngredients,
} from "./pizzaSlice";
import IconButton from "@mui/material/IconButton";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const Pizza = () => {
  const ingredients = useAppSelector((state) => state.pizza.ingredients);
  const dispatch = useAppDispatch();
  const [ingredient, setIngredient] = React.useState("");

  const addIngredientHandler = () => {
    dispatch(addIngredient(ingredient));
    setIngredient("");
  };
  const removeIngredientHandler = (ingredient: string) => {
    dispatch(removeIngredient(ingredient));
  };
  const removeAllHandler = () => {
    dispatch(removeAllIngredients());
  };

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <FormGroup>
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="Label"
            />
            <FormControlLabel disabled control={<Switch />} label="Disabled" />
          </FormGroup>
          <Stack direction="row" spacing={1}>
            <TextField
              variant="outlined"
              size="small"
              label="Add ingredient"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addIngredientHandler();
                }
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                addIngredientHandler();
              }}
            >
              Add
            </Button>
          </Stack>

          <Typography variant="h6">Pizza ingredients:</Typography>
          <List>
            {ingredients.map((ingredient, index) => {
              return (
                <ListItem
                  key={index}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        removeIngredientHandler(ingredient);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemText>{ingredient}</ListItemText>
                </ListItem>
              );
            })}
          </List>
          <Button
            variant="contained"
            color="warning"
            onClick={() => {
              removeAllHandler();
            }}
          >
            Remove all ingredients
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Pizza;
