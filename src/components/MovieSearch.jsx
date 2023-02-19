import React from 'react'
import { Link } from '@mui/material'
import { AppStore } from '../store'
import { useSelector } from 'react-redux'

export default function DefaultPgae(props) {
    const [MovieData] = React.useState(props.movie)
    const [MovieData2, setMovieData2] = React.useState(null)
    const [MovieFilter] = React.useState(props.id)
    const a1 = useSelector(AppStore)

    React.useEffect(() => {
        const MovieFilterQuery = a1.filter
        const filterMovies = (MovieArray, MovieFilterQuery1) => {
            if (MovieFilterQuery1) {
                if (MovieFilterQuery1.label === 'yafter') {
                    return MovieArray.filter(item => {
                        return item.release_date.split('-')[0] > MovieFilterQuery1.year &&
                            item.title.toString().toLowerCase().includes(MovieFilterQuery1.title.toString().toLowerCase()) &&
                            item.ratings.average >= MovieFilterQuery1.ratingRange[0] &&
                            item.ratings.average <= MovieFilterQuery1.ratingRange[1]
                    })
                }
                if (MovieFilterQuery1.label === 'ybefore') {
                    return MovieArray.filter(item => {
                        return item.ratings.average >= MovieFilterQuery1.ratingRange[0] &&
                            item.title.toString().toLowerCase().includes(MovieFilterQuery1.title.toString().toLowerCase()) &&
                            item.release_date.split('-')[0] < MovieFilterQuery1.year &&
                            item.ratings.average <= MovieFilterQuery1.ratingRange[1]
                    });
                }
                if (MovieFilterQuery1.label === 'Between') {
                    return MovieArray.filter(item => {
                        return item.release_date.split('-')[0] > MovieFilterQuery1.yearRange[0] &&
                            item.title.toString().toLowerCase().includes(MovieFilterQuery1.title.toString().toLowerCase()) &&
                            item.release_date.split('-')[0] < MovieFilterQuery1.yearRange[1] &&
                            item.ratings.average >= MovieFilterQuery1.ratingRange[0] &&
                            item.ratings.average <= MovieFilterQuery1.ratingRange[1]
                    });
                }
            }
        }
        if (MovieFilterQuery !== undefined) {
            if (MovieData !== null && Object.keys(MovieFilter).length !== 0) {
                setMovieData2(filterMovies(MovieData, MovieFilterQuery))
            }
            if (MovieData !== null && Object.keys(MovieFilter).length === 0) {
                setMovieData2(filterMovies(MovieData, MovieFilterQuery))
            }
        }
    }, [MovieData, MovieFilter, a1])

    return (
        <div style={{ height: '90vh', width: '50vw', backgroundColor: 'beige' }} key="1">
            <h4 style={{ textAlign: 'center' }}>Movies</h4>
            {MovieData === null ? "Loading" :
                [
                    <div className='table-container' style={{ display: 'flex', justifyContent: 'center' }}>
                        {
                            (MovieData2 === null || MovieData2.length < 1) ? <h1 key={MovieFilter} >Movie not found </h1> :
                                <table className='table' key={MovieData2}>
                                    <thead style={{ font: '-webkit-small-control' }}>
                                        <tr style={{ backgroundColor: '#e0f' }}>
                                            <th style={{ paddingInline: '190px' }}>Title</th>
                                            <th style={{ paddingInline: '15px' }}>Year</th>
                                            <th style={{ paddingInline: '5px' }}>Rating</th>
                                            <th style={{ paddingInline: '5px' }}>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody style={{ position: 'absolute', height: '70vh', overflow: 'auto' }}>
                                        {MovieData2.map((it) => {
                                            return <tr >
                                                <td >
                                                    {it['title']}
                                                </td>
                                                <td style={{
                                                    paddingRight: '24px'
                                                }}>
                                                    {it['release_date'].split('-')[0]}
                                                </td>
                                                <td >
                                                    {it['ratings']['average']}
                                                </td>
                                                <td style={{ fontFamily: 'monospace', paddingInline: '15px' }}>
                                                    <Link href={"http://www.randyconnolly.com/funwebdev/3rd/api/movie/movies.php?id=" + it['id']}>
                                                        view more
                                                    </Link>
                                                </td>
                                            </tr>
                                            // <br />{it['details']['overview']}
                                        })}
                                    </tbody>
                                </table>
                        }
                    </div>
                ]
            }
        </div>
    )
}
