import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

function PokemonList(props: any) {
  const { pokemonList, isLoading, error } = props;

  if (isLoading) return <CircularProgress />;
  if (error) return <p>Error</p>;
  return (
    <>
      {pokemonList?.data.map((post: any) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </div>
      ))}
    </>
  );
}

export default PokemonList;
