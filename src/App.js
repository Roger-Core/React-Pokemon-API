import React, { useState, useEffect } from 'react'
import Navbar from './components/NavBar/Navbar'
import { getAllPokemon, getPokemon } from './components/PokeList'
import Pokemon from './components/Pokemon'
import './App.css'

function App() {

  const [pokemon, setPokemon] = useState([])
  const [nextUrl, setNextUrl] = useState('')
  const [prevUrl, setPrevUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon'

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl)
      setNextUrl(response.next)
      setPrevUrl(response.previous)
      let pokemon = await loadingPokemon(response.results)
      console.log(pokemon)
      setLoading(false)
    }
    fetchData()
  }, [])

  const next = async () => {
    setLoading(true)
    let data = await getAllPokemon(nextUrl)
    await loadingPokemon(data.results)
    setNextUrl(data.next)
    setPrevUrl(data.previous)
    setLoading(false)
  }

  const Prev = async () => {
    if (!prevUrl) return
    setLoading(true)
    let data = await getAllPokemon(prevUrl)
    await loadingPokemon(data.results)
    setNextUrl(data.next)
    setPrevUrl(data.previous)
    setLoading(false)
  }

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonCard = await getPokemon(pokemon.url)
      return pokemonCard
    }))

    setPokemon(_pokemonData)
  }

  const LoadingStyle = {
    color: '#fff',
    textAling: 'center'
  }

  return (
    <div>
      {loading ? (
        <h1 style={LoadingStyle}>Loading...</h1>
      ) : (
          <>
            <Navbar />
            <div className="btn">
              <button onClick={Prev}>Prev</button>
              <button onClick={next}>Next</button>
            </div>
            <div className='grid-container'>
              {pokemon.map((pokemon, i) => {
                return <Pokemon key={i} pokemon={pokemon} />
              })}
            </div>

            <div className="btn">
              <button onClick={Prev}>Prev</button>
              <button onClick={next}>Next</button>
            </div>

          </>
        )}
    </div>
  )
}

export default App
