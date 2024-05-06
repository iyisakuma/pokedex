const URL = "https://pokeapi.co/api/v2/pokemon";
const IMG_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

const pokedex = document.querySelector("#pokedex");
let count = 1,
  offsize = 1;

fetchPokeApi();

async function fetchPokeApi() {
  while (count <= 21 * offsize) {
    await fetch(`${URL}/${count}`)
      .then((resp) => resp.json())
      .then((json) => mountPokemonCard(json));
    count++;
  }
}

onscrollend = async (event) => {
  offsize++;
  await fetchPokeApi();
};

function mountPokemonCard(pokemon) {
  let card = document.createElement("div");
  card.classList.add("card");
  card.style.backgroundColor = getColorFromType(pokemon.types[0].type.name);

  let idPokemon = document.createElement("span");
  idPokemon.classList.add("pokemon-id");
  idPokemon.innerHTML = formatId(pokemon.id);
  let hfIdPokemon = document.createElement("input");

  let imgPokemon = document.createElement("img");
  imgPokemon.setAttribute("src", `${IMG_URL}/${pokemon.id}.png`);
  imgPokemon.classList.add("pokemon");

  let nomePokemon = document.createElement("span");
  nomePokemon.classList.add("pokemon-name");
  nomePokemon.innerHTML = pokemon.name;

  hfIdPokemon.setAttribute("type", "hidden");
  hfIdPokemon.setAttribute("id", `id${pokemon.name}`);
  hfIdPokemon.setAttribute("value", pokemon.id);

  card.appendChild(idPokemon);
  card.appendChild(imgPokemon);
  card.appendChild(nomePokemon);
  card.appendChild(hfIdPokemon);
  pokedex.appendChild(card);
}

function getColorFromType(pokemonType) {
  switch (pokemonType) {
    case "normal":
      return "#A8A77A";
    case "fire":
      return "#EE8130";
    case "water":
      return "#6390F0";
    case "electric":
      return "#F7D02C";
    case "grass":
      return "#7AC74C";
    case "ice":
      return "#96D9D6";
    case "fighting":
      return "#C22E28";
    case "poison":
      return "#A33EA1";
    case "ground":
      return "#E2BF65";
    case "flying":
      return "#A98FF3";
    case "psychic":
      return "#F95587";
    case "bug":
      return "#A6B91A";
    case "rock":
      return "#B6A136";
    case "ghost":
      return "#735797";
    case "dragon":
      return "#6F35FC";
    case "dark":
      return "#705746";
    case "steel":
      return "#B7B7CE";
    case "fairy":
      return "#D685AD";
  }
}

function formatId(pokemonId) {
  if (pokemonId < 10) {
    return `#00${pokemonId}`;
  }
  if (pokemonId < 100) {
    return `#0${pokemonId}`;
  }
  return `#${pokemonId}`;
}
