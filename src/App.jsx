import { useEffect, useState } from 'react'
import PokemonCard from './components/PokemonCard'
import { getPokemonList } from './services/pokemonService'

const pageStyle = {
  fontFamily: 'sans-serif',
  padding: '20px',
  backgroundColor: '#f8fafc',
  minHeight: '100vh',
}

const titleStyle = {
  textAlign: 'center',
  color: '#0f172a',
}

const searchContainerStyle = {
  textAlign: 'center',
  marginBottom: '20px',
}

const inputStyle = {
  width: '280px',
  padding: '10px',
  border: '1px solid #cbd5e1',
  borderRadius: '4px',
  outline: 'none',
}

const messageStyle = {
  textAlign: 'center',
  color: '#334155',
}

const errorStyle = {
  textAlign: 'center',
  color: '#b91c1c',
}

const gridStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}

// Vista principal de la Pokédex construida con React y Vite
function App() {
  const [pokemonList, setPokemonList] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let activo = true

    const cargarLista = async () => {
      try {
        const resultados = await getPokemonList(20, 0)
        if (activo) setPokemonList(resultados)
      } catch (err) {
        if (activo) setError(err.message)
      } finally {
        if (activo) setLoading(false)
      }
    }

    cargarLista()

    return () => {
      activo = false
    }
  }, [])

  const filteredPokemons = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>Catálogo Pokédex</h1>

      <div style={searchContainerStyle}>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          style={inputStyle}
          aria-label="Buscar Pokémon por nombre"
        />
      </div>

      {loading && (
        <p style={messageStyle}>Cargando datos desde el servidor...</p>
      )}

      {error && <p style={errorStyle}>Error: {error}</p>}

      {!loading && !error && (
        <div style={gridStyle}>
          {filteredPokemons.length > 0 ? (
            filteredPokemons.map((pokemon) => (
              <PokemonCard key={pokemon.name} pokemonName={pokemon.name} />
            ))
          ) : (
            <p style={messageStyle}>No se encontraron coincidencias.</p>
          )}
        </div>
      )}
    </div>
  )
}

export default App
