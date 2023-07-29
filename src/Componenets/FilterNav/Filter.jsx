import React, { useEffect, useState,Component } from 'react'
import './filter.scss'
import { fetchData2 } from '../../utilities/fetchData';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'
import { components } from 'react-select';


const ValueContainer = ({ children, ...props }) => {
  const { getValue, hasValue } = props;
  const nbValues = getValue().length;
  if (!hasValue) {
    return (
      <components.ValueContainer {...props}>
        {children}
      </components.ValueContainer>
    );
  }
  return (
    <components.ValueContainer {...props}>
      {`${nbValues} items`}
    </components.ValueContainer>
  );
};

function Filter() {

  const [type, setType] = useState('');
  // const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [status, setStatus] = useState('');
  const [genreSelected,setGenreSelected] = useState()
  // const [year, setYear] = useState('')

  const navigate = useNavigate();
  const handleType = (data) => {
    setType(data.value);
  };
  const handleGenre = (data) => {
    setGenreSelected(data);
    console.log(genreSelected)
  };
  const handleRating = (data) => {
    setRating(data.value);
  };
  const handleStatus = (data) => {
    setStatus(data.value);
  };
  const handleYear = (event) => {
    setYear(event.target.value);
  };

  const handleFilter = ()=>{
    let string = ``;
    if(type != ''){
      string += `type=${type}`;
    }
    if(status != ''){
      string += `&status=${status}`
    }
    if(rating != ''){
      string += `&rating=${rating}`
    }
    if(genreSelected != undefined){
      let strings = '';
      const genre = genreSelected.map((data,index)=>{
        if(index == genreSelected.length-1){
          strings += data.value;
        }else{
          strings += data.value+','
        }
      // console.log(data.value + " " + index);
      })
      string += `&genres=${strings}`
    }
    setType('');
    setStatus('')
    setRating('')
    setGenreSelected(undefined);
    navigate({
      pathname : '/filter',
      search : string,
    })
  }
const typeOptions = [
  {value : 'tv', label : 'Tv'},
  {value : 'movie',label : 'Movie'},
  {value :  'ova' , label :'Ova'},
  {value : 'special', label : 'Special'},
  {value : 'ona' , label :'Ona'},
  {value : 'music' , label :'Music'}
]
const ratingOptions = [
  {value : 'g' , label : 'G'},
  {value : 'pg' , label : 'PG'},
  {value : 'pg13' , label : 'PG-13'},
  {value : 'r17' , label : 'R-17+'},
  {value : 'r' , label : 'R+'}
]
const statusOpitons = [
  {value : 'airing', label:'Airing'},
  {value : 'complete' , label : 'Complete'},
  {value : 'upcoming' , label : 'Upcoming'}
]
const genreOptions = [
  {value : '1' , label :'Action'},
  {value : '2' , label :'Adventure'},
  {value : '5' , label :'Avant Garde'},
  {value : '46' , label :'Award Winning'},
  {value : '28' , label :'Boys Love'},
  {value : '4' , label :'Comedy'},
  {value : '8' , label :'Drama'},
  {value : '10' , label :'Fantasy'},
  {value : '26' , label :'Girls Love'},
  {value : '47' , label :'Gourmet'},
  {value : '14' , label :'Action'},
  {value : '7' , label :'Mystery'},
  {value : '22' , label :'Romance'},
  {value : '24' , label :'Sci-Fi'},
  {value : '36' , label :'Slice of Life'},
  {value : '30' , label :'Sports'},
  {value : '31' , label :"Supernatural"},
  {value : '41' , label :'Suspense'},
]

const components = {ValueContainer};
  return (
    <div  className='filter' >
      <Select id="type" onChange={handleType} options={typeOptions} placeholder="TYPE"/>
      <Select id="rating" onChange={handleRating} options = {ratingOptions} placeholder="RATING"/>
      <Select id="status" onChange={handleStatus} options = {statusOpitons} placeholder="STATUS"/>
      <Select id = 'genre' onChange={handleGenre} options={genreOptions} placeholder="GENRE" isMulti components={components}/>
      <button className='submit' onClick={handleFilter}>Filter</button>
    </div>
  )
}

export default Filter
