import React, { useEffect, useState } from 'react'
import Navbar from '../../Componenets/Navbar/Navbar'
import { useLocation } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { fetchData2 } from './../../utilities/fetchData'
import './anime.scss'
import Aside from './Aside/Aside'
import { titleCase } from '../../utilities/titleCase'
import { truncateString } from '../../utilities/truncate'
import { Typography } from '@mui/material'
import HoverRating from '../../utilities/HoverRating'
// import {Rating }

function Anime() {

  const location = useLocation();
  const prop = location.state;
  // console.log(prop)
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  // console.log(prop)
  const [episode, setEpisode] = useState(prop.currentEpisode);
  const [url, setUrl] = useState(`https://api.enime.moe/view/${prop.id}/${episode}`);
  const [episodeLimit, setEpisodeLimit] = useState(0);
  const [episodeLength, setEpisodeLength] = useState(-1)
  const [dropdownValue,setDropdownValue] = useState("");
  useEffect(() => {
    const getData = async () => {
      const res = await fetchData2(url);
      setData(res);
      setEpisode(res.number);
      setEpisodeLimit(Math.floor(res.number / 100) * 100 + 1)
      setEpisodeLength(Math.floor(res?.anime?.episodes.length / 100));
      setDropdownValue(`${Math.floor(res?.number/100)*100}`);
      if (res) {
        const res2 = await fetchData2(`https://api.enime.moe/source/${res?.sources?.[0].id}`)
        setData2(res2);

        // console.log(episodeLength)
      }
    }
    getData()
  }, [url])
  console.log(dropdownValue)
  const btnHandler = (res) => {
    // console.log(res)
    setUrl(`https://api.enime.moe/view/${res.animeId}/${res.number}`)
  }

  const dropdownHandler = (e) => {
    setEpisodeLimit(e.target.value);
    setDropdownValue(e.target.value)
  }
  // console.log(res.coverImage);
  return (
    <div className="">
      <Navbar />
      <div className='anime'>
        <div className='main'>
          {(prop != undefined) ? (<>
            <div className="main-video">
              <ReactPlayer className="react-player"
                light={<img src={data?.anime?.bannerImage || data?.anime?.coverImage} />}
                url={data2?.url} controls={true}
                width='100%'
                height='100%'
              />
            </div>
            <div className="main-episodes">
              <div className="main-episodes__dropdown">
                <select className="dropdown-menu" onChange={dropdownHandler} value={dropdownValue} >
                  {
                    Array.from({ length: episodeLength + 1 }, (_, i) => {
                      return (
                        <option key={i} value={`${i * 100}`}>{i * 100}-{(i + 1) * 100} </option>
                      )
                    })
                  }
                </select>
              </div>
              <div className="main-episodes__btn">
                {
                  data != undefined ? (
                    data?.anime?.episodes.map((data, i) => {
                      return (i > (parseInt(episodeLimit - 2)) && i < (parseInt(episodeLimit) + 100) && (
                        <button res={data} key={data.id}
                          onClick={() => { btnHandler(data) }}
                          className={`btn ${episode == i + 1 ? ' active' : ''}`}>{i + 1}
                        </button>
                      ))
                    })
                  ) : (
                    <h1>Hello</h1>
                  )
                }
              </div>
            </div>
            <div className="main-info">
              <div className="info-image">
                <img src={data?.anime?.coverImage} alt="" />
              </div>
              <div className="info-about">
                <div className="info-about__name">
                  {titleCase(data?.anime?.slug)?.toUpperCase()}
                </div>
                <div className='main-detail'>
                  <div className="main-detail__header">
                    <div className="format">
                      {prop?.format}
                    </div>
                    <div className="rating">
                      PG13
                    </div>3
                    <div className="quality">
                      HD
                    </div>
                    <div className="currentEpisode">
                      {prop.currentEpisode}
                    </div>
                  </div>
                  <div className="info-about__disc">
                    {truncateString(prop?.description)}
                  </div>
                  <div className="main-detail__main">
                    <div className="type">
                      <p className='type-para'>Type : </p>{prop?.format || '?'}
                    </div>
                    <div className="premiered">
                      <p className='premiered-para'> Premiered : </p>{prop?.season === 'UNKNOWN' ? '?' : prop?.season}  {prop?.year || '?'}
                    </div>
                    <div className="status">
                      <p className='status-para'>Status : </p>{prop?.status || '?'}
                    </div>
                    <div className="duration">
                      <p className='duration-para'>Duration : </p>{prop?.duration || '?'}
                    </div>
                    <div className="country">
                      <p className='country-para'>Country : </p>{prop?.countryOfOrigin || '?'}
                    </div>
                    <div className="genre">
                      <p className='genre-para'>Genre : </p>{prop?.genre.map((gen) => gen + ", ")}
                    </div>
                  </div>
                </div>
              </div>
              <div className="main-rating">
                <HoverRating />
              </div>
            </div>
          </>) : (
            <p>ERROR</p>
          )
          }
        </div>
        <div className='aside'>
          <Aside />
        </div>
      </div>
    </div>
  )
}

export default Anime