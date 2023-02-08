import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import Button from "@mui/material/Button";
import PokemonList from "./PokemonList";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

function Pokemon() {
  const { isLoading, error, data, refetch } = useQuery(
    "posts",
    () => axios("https://jsonplacholder.typicode.com/posts?_limit=10"),
    { enabled: false }
  );
  return (
    <Card>
      <CardContent>
        <PokemonList pokemonList={data} isLoading={isLoading} error={error} />
        <Button
          onClick={() => {
            refetch();
          }}
        >
          Fetch
        </Button>
      </CardContent>
    </Card>
  );
}

export default Pokemon;
