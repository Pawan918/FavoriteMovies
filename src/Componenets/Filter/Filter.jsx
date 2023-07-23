import React, { useState } from 'react'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Filter() {
  const [type, setType] = useState('');
  const [genre, setGenre] = useState('');
  const [rating,setRating] = useState('');
  const [status,setStatus] = useState('');
  const [year,setYear] = useState('')

  const handleType = (event) => {
    setType(event.target.value);
  };
  const handleGenre = (event) => {
    setGenre(event.target.value);
  };
  const handleRating = (event) => {
    setRating(event.target.value);
  };
  const handleStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleYear = (event) => {
    setYear(event.target.value);
  };
  return (
    <div>
      <Box sx={{ minWidth: 120 ,display:'flex',margin:'20px',gap:'20px'}}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="type"
            onChange={handleType}
            MenuProps={{disableScrollLock:true,}}
          >
            <MenuItem value={'tv'} >TV</MenuItem>
            <MenuItem value={'movie'}>MOVIE</MenuItem>
            <MenuItem value={'ova'}>OVA</MenuItem>
            <MenuItem value={'special'}>SPECIAL</MenuItem>
            <MenuItem value={'ona'}>ONA</MenuItem>
            <MenuItem value={'music'}>MUSIC</MenuItem>
          </Select>
        </FormControl>
        {/* <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Genre</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={genre}
            label="genre"
            onChange={handleGenre}
            MenuProps={{disableScrollLock:true,}}
          >
            <MenuItem value={tv} >TV</MenuItem>
            <MenuItem value={movie}>MOVIE</MenuItem>
            <MenuItem value={ova}>OVA</MenuItem>
            <MenuItem value={special}>SPECIAL</MenuItem>
            <MenuItem value={ona}>ONA</MenuItem>
            <MenuItem value={music}>MUSIC</MenuItem>
          </Select>
        </FormControl> */}
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Rating</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={rating}
            label="rating"
            onChange={handleRating}
            MenuProps={{disableScrollLock:true,}}
          >
            <MenuItem value={'g'}>G</MenuItem>
            <MenuItem value={'pg'}>PG</MenuItem>
            <MenuItem value={'pg13'}>PG-13</MenuItem>
            <MenuItem value={'r17'}>R-17+</MenuItem>
            <MenuItem value={'r'}>R+</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="status"
            onChange={handleStatus}
            MenuProps={{disableScrollLock:true,}}
          >
            <MenuItem value={'airing'}>AIRING</MenuItem>
            <MenuItem value={'complete'}>COMPLETE</MenuItem>
            <MenuItem value={'upcoming'}>UPCOMING</MenuItem>
          </Select>
        </FormControl>
        {/* <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Year</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={year}
            label="year"
            onChange={handleYear}
            MenuProps={{disableScrollLock:true,}}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl> */}
      </Box>
    </div>
  )
}

export default Filter
