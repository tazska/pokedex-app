import { useEffect, useState } from 'react'
import { getPokemonDetails } from '../services/pokemonService'

const cardStyle = {
  border: '1px solid #cbd5e1',
  borderRadius: '6px',
  padding: '15px',
  margin: '10px',
  width: '180px',
  textAlign: 'center',
  backgroundColor: '#ffffff',
}

// Tarjeta que consulta y muestra el detalle de un Pokémon con React
function PokemonCard({ pokemonName }) {
  const [pokemon, setPokemon] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let activo = true

    const cargarDetalle = async () => {
      setLoading(true)
      setError(null)
      try {
        const datos = await getPokemonDetails(pokemonName)
        if (activo) setPokemon(datos)
      } catch (err) {
        if (activo) setError(err.message)
      } finally {
        if (activo) setLoading(false)
      }
    }

    cargarDetalle()

    return () => {
      activo = false
    }
  }, [pokemonName])

  if (loading) {
    return <div style={cardStyle}>Cargando registro...</div>
  }

  if (error || !pokemon) {
    return (
      <div style={cardStyle}>
        No se pudo cargar la información de este Pokémon.
      </div>
    )
  }

  const nombreCapitalizado =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
  const tipos = pokemon.types.map((item) => item.type.name).join(', ')

  return (
    <div style={cardStyle}>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        width="100"
        height="100"
      />
      <h3>
        #{pokemon.id} {nombreCapitalizado}
      </h3>
      <p>Tipos: {tipos}</p>
      <p>HP: {pokemon.stats[0].base_stat}</p>
      <p>Ataque: {pokemon.stats[1].base_stat}</p>
    </div>
  )
}

export default PokemonCard
