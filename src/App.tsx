import React, {useEffect, useState} from 'react';
import './App.css';
import CharacterGallery from "./components/CharacterGallery";
import Header from "./components/Header";
import ActionBar from "./components/ActionBar";
import {Character} from "./Character";
import axios from "axios";

function App() {

    const [characters, setCharacter] = useState<Character[]>([])
    const [searchText, setSearchText] = useState<string>("")
    const filteredCharacters = characters.filter(character => character.name.toLowerCase().includes(searchText.toLowerCase()))

    useEffect(() => {
        getCharacters()
    }, [])

    const getCharacters = () => {
        axios.get("https://rickandmortyapi.com/api/character")
            .then((response) => {
                return response.data
            })
            .then((data) => {
                setCharacter(data.results)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <div className="App">
            <Header/>
            <ActionBar setSearchText={setSearchText}/>
            <CharacterGallery characters={filteredCharacters}/>
        </div>
    );
}

export default App;
