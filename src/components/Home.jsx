import React, { useState } from 'react'
import { Box, Button, Input, InputLabel, FormControl } from '@mui/material'
import '../index.css'
import { Link } from 'react-router-dom'
export default function Home() {
    const [inputValue, setinputData] = useState('')

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', backgroundColor: 'pink' }}>
            <div style={{
                height: '60%', width: '50%', alignSelf: 'center', textAlign: 'center',
                backgroundColor: 'white'
            }}>
                <Box>
                    <h3 style={{fontSize:'24px',color:'#f00'}}>
                        Movie finder
                    </h3>
                </Box>
                <br />
                <br />
                <FormControl>
                    <InputLabel variant='filled' htmlFor="MovieName" >Title</InputLabel>
                    <Input
                        type="text"
                        id='MovieName'
                        name='MovieName'
                        onInput={(event) => {
                            setinputData(event.target.value)
                            console.log(event.target.value)
                        }}
                        required='true' />
                    <br />
                    <div style={{ display: 'flex', alignSelf:'center' }}>
                        {inputValue !== '' ?
                         <Button size="medium" variant='contained' color='primary' LinkComponent={Link} to={`/search/${inputValue}`} type='submit'> Search</Button>
                         : null}
                        <Button size="medium" variant='contained' color='secondary' LinkComponent={Link} to={`/search/`} type='submit' >Search all</Button>
                    </div>
                </FormControl>
            </div>
        </div>
    )
}
