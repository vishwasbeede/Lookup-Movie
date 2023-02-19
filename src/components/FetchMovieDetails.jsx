import React, { useContext, createContext } from 'react'
import axios from 'axios';
export const MovieDataVal = createContext();

const uriTarget = 'http://www.randyconnolly.com/funwebdev/3rd/api/movie/movies-brief.php?id=ALL'

export default FetchMovieDetails = () => {
    return (
        <MovieDataVal.Provider value={axios.get(uriTarget).data}></MovieDataVal.Provider>
    )
}


