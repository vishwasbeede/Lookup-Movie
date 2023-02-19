import {
  Container, FormControl, FormControlLabel, RadioGroup, Input, ListItem, List, Checkbox, Box, Button,
  Slider, FormLabel, Radio, TextField, ToggleButton
} from '@mui/material'
import Button1 from '@mui/icons-material/More';
import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../slice/filter';

export default function MovieFilters() {
  const [years, setyears] = React.useState(1950);
  const [title, setTitle] = React.useState('');
  const [yearsRange, setyearsRange] = React.useState([1950, 2020]);
  const [ratingRange, setratingRange] = React.useState([5, 8]);
  const [yearsSelection, setyearsSelection] = React.useState('yafter');
  const [genereList, setgenereList] = React.useState({
    "All": false,
    "Horror": false,
    "Romance": false,
    "Action": false,
    "Thriller": false,
    "Science Fiction": false,
    "Family": false,
    "Adventure": false,
    "Comedy": false,
    "Crime": false,
    "Mystery": false,
    "Fantasy": false,
    "Drama": false,
    "War": false,
    "Animation": false
  })

  const dispatch = useDispatch();
  const selectedFilter = (event) => {
    setyears(event.target.value)
  }
  const QueryFilter = (e) => {
    dispatch(setFilter(e))
  }
  const setGeneres = (event, value) => {
    let checkBoxVal1 = genereList
    let obj = {}
    obj[value] = event
    if ((value === 'All' && event === true) || checkBoxVal1['All'] === true) {
      if (event === false && value === 'All') {
        obj[value] = false
        setgenereList(checkBoxVal1 => (
          { ...checkBoxVal1, ...obj }
        )
        )
      }
      else {
        let checkBoxVal2 = { ...Object.keys(checkBoxVal1).reduce((reduced, key) => ({ ...reduced, [key]: true }), {}) }
        setgenereList(checkBoxVal2)
      }
    }
    else {
      setgenereList(checkBoxVal1 => (
        { ...checkBoxVal1, ...obj }
      )
      )
    }
  }
  return (
    <div style={{ fontSize: '10px', paddingBlock: '.5px' }}>
      <Container style={{ display: 'flex', flexDirection: 'column', maxWidth: '25em' }} >
        <h3 style={{ alignSelf: 'center', marginBlock: '.5px' }}>Movie Filter</h3>
        <List style={{ display: 'flex', flexDirection: 'column' }}>
          <ListItem>
            <FormLabel className='name' >Title</FormLabel>
            <Input value={title} onChange={(e) => {
              setTitle(e.target.value)
            }}> </Input>
          </ListItem>
          <ListItem>
            <FormControl>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <FormLabel className='year'>Year</FormLabel>
                <TextField size="small" sx={{ paddingBlock: '.5px' }} value={yearsSelection === 'Between' ? yearsRange : years} />
              </div>
              <RadioGroup value={yearsSelection} onChange={(e) => {
                setyearsSelection(e.target.value)
              }
              }>
                <FormControlLabel sx={{ paddingBlock: '.5px' }} value="yafter" control={<Radio />} label="After" />
                <Slider size='small'
                  name='yafter' defaultValue={1970} min={1950} max={2020}
                  valueLabelDisplay='auto'
                  onChange={selectedFilter}
                  disabled={yearsSelection !== 'yafter' ? true : false}
                />
                <FormControlLabel value="ybefore" control={<Radio />} label="Before" />
                <Slider size='small' sx={{ paddingBlock: '.5px' }} name='ybefore' defaultValue={1970}
                  min={1950} max={2020}
                  onChange={selectedFilter}
                  disabled={yearsSelection !== 'ybefore' ? true : false}
                  valueLabelDisplay='auto' ></Slider>
                <FormControlLabel value="Between" control={<Radio />} label="Between"
                />
                <Slider size='small' name='ybetween' min={1950} max={2020}
                  value={yearsRange} getAriaValueText={(value) => { return `${value}` }} valueLabelDisplay='auto'
                  onChange={(e) => setyearsRange(e.target.value)}
                  disabled={yearsSelection !== 'Between' ? true : false} ></Slider>
              </RadioGroup>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl>

              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <FormLabel className='genere' style={{ paddingRight: '20px' }}>Genere</FormLabel>
                <ToggleButton value="show" onChange={() => {
                  if (document.getElementsByClassName('genere-box')[0].style.display === 'none') {
                    document.getElementsByClassName('genere-box')[0].style.display = 'block'
                  }
                  else {
                    document.getElementsByClassName('genere-box')[0].style.display = 'none'
                  }
                }
                }
                  size='small' sx={{ width: '10px', height: '10px' }}>

                  <Button1 size='small' > </Button1>
                </ToggleButton>
              </div>
              <Box className="genere-box" sx={{ width: '20em', display: 'none' }}>
                {Object.keys(genereList).map((item, index) => {
                  return <FormControlLabel key={index} className={'genre' + index}
                    control={<Checkbox sx={{ paddingBlock: '.5px' }} value={item}
                      onChange={(e) => setGeneres(e.target.checked, e.target.value)}
                      checked={genereList[item] ? true : false}
                    />} label={item} />
                })}
              </Box>
              <Button onClick={() => {
                let genereListKeys = Object.keys(genereList)
                for (let i = 0; i < genereListKeys.length; i++) {
                  setGeneres(false, genereListKeys[i])
                }
              }
              }>Reset</Button>
            </FormControl>
          </ListItem>
          <ListItem>
            <FormControl>
              <FormLabel> Ratings :</FormLabel>
              <TextField size='small' value={ratingRange ? ratingRange : ''} />
              <br />
              <Slider size='small' min={0} max={10}
                value={ratingRange} getAriaValueText={(value) => { return `${value}` }} valueLabelDisplay='auto'
                onChange={(e) => setratingRange(e.target.value)} />
              <Button variant='contained' type='submit' onClick={(e) => {
                e.preventDefault()
                let data1 = {}
                data1['year'] = years
                data1['title'] = title
                data1['yearRange'] = yearsRange
                data1['ratingRange'] = ratingRange
                data1['label'] = yearsSelection
                data1['genere'] = genereList
                QueryFilter(data1)
              }}>Filter</Button>
            </FormControl>
          </ListItem>
        </List>
      </Container>
    </div >
  )
}

// data1.filter((item)=>{
//   if (item.title.toString().includes('The')){
//       return item
//   }
// })
// data1.filter((item)=>{
//   if (item.release_date.split('-')[0] > 2004){
//       return item
//   }
// })
// data1.filter((item)=>{
//   if (item.ratings.average > 8){
//       return item
//   }
// })