import axios from 'axios'

// URL base de PokéAPI definida en las variables de entorno de Vite
const BASE_URL = import.meta.env.VITE_POKEAPI_URL

// Obtiene una lista paginada de Pokémon desde PokéAPI usando Axios
export const getPokemonList = async (limit = 20, offset = 0) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`
    )
    return response.data.results
  } catch (error) {
    throw new Error('Error al obtener la lista de datos: ' + error.message)
  }
}

// Obtiene el detalle de un Pokémon por nombre o identificador usando Axios
export const getPokemonDetails = async (nameOrId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/pokemon/${String(nameOrId).toLowerCase()}`
    )
    return response.data
  } catch {
    throw new Error(`No se pudo obtener la información de "${nameOrId}"`)
  }
}
