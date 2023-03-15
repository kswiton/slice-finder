import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

interface AddIngredientDialogProps {
  open: boolean;
  handleClose: () => void;
  ingredientToAdd: any;
  setIngredientToAdd: (ingredient: any) => void;
  handleSaveNewIngredient: () => void;
}

const AddIngredientDialog: React.FC<AddIngredientDialogProps> = ({
  open,
  handleClose,
  ingredientToAdd,
  setIngredientToAdd,
  handleSaveNewIngredient,
}) => {
  console.log("ingredientToAdd", ingredientToAdd);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Dodaj składnik</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Wypełnij pola poniżej, aby dodać składnik do bazy danych.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nazwa składnika"
          type="text"
          fullWidth
          variant="outlined"
          value={ingredientToAdd?.name}
          onChange={(e) =>
            setIngredientToAdd({ ...ingredientToAdd, name: e.target.value })
          }
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nazwy alternatywne"
          type="text"
          rows={4}
          fullWidth
          variant="outlined"
          value={ingredientToAdd?.alternativeNames}
          onChange={(e) =>
            setIngredientToAdd({
              ...ingredientToAdd,
              alternativeNames: e.target.value,
            })
          }
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Wegetariański?"
          value={ingredientToAdd?.vegetarian}
          onChange={() =>
            setIngredientToAdd((prev: any) => ({
              ...prev,
              vegetarian: !prev.vegetarian,
            }))
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Anuluj</Button>
        <Button onClick={handleSaveNewIngredient}>Zapisz</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddIngredientDialog;
