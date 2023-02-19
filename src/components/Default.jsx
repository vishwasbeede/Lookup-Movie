import React, { useEffect, useState } from 'react'
import MovieFilters from './MovieFilters'
import { Container } from '@mui/material'
import DefaultPgae from './MovieSearch'
import { axios } from 'axios'
import { useParams } from 'react-router-dom'
export default function Default() {
    const [MovieDataIn, SetMovieDataIn] = useState(null)
    const uriTarget = 'http://www.randyconnolly.com/funwebdev/3rd/api/movie/movies-brief.php?id=ALL'
    const qury = useParams('id')

    // SetMovieDataIn(MovieData)
    useEffect(() => {
        axios.get(uriTarget).then((res) => SetMovieDataIn(res.data))
    }, [qury]);

    return (
        <Container sx={{ textAlign: 'center' }}>
            <h1>Movie Finder </h1>
            <Container sx={{ display: 'flex', flexDirection: 'row', backgroundColor: 'azure' }}>
                <MovieFilters />
                {
                    (MovieDataIn === null) ?
                        <p>Loading</p> :
                        <DefaultPgae id={qury} movie={MovieDataIn} />
                }
            </Container>
        </Container>
    )
}
