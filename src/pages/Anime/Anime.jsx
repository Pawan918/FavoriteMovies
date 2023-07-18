import React, { useEffect, useState } from 'react'
import Navbar from '../../Componenets/Navbar/Navbar'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import ReactPlayer from 'react-player'
import { fetchData2 } from './../../utilities/fetchData'
// import { useLocation } from 'react-router-dom'
import './anime.scss'
import Aside from './Aside/Aside'
import { titleCase } from '../../utilities/titleCase'
import { truncateString } from '../../utilities/truncate'
import HoverRating from '../../utilities/HoverRating'
import { Link } from 'react-router-dom'
function Anime() {

  const params = useParams();
  // to get the data of the anime
  const [data, setData] = useState([]);
  // to get the video data of the anime
  const [data2, setData2] = useState([]);
  // to set the currentEpisode of the data
  const [data3, setData3] = useState([]);
  const [episode, setEpisode] = useState(params.ep);

  // to set the url of the data
  const [url, setUrl] = useState(`https://api.enime.moe/view/${params.name}/${episode}`);

  // to set the episode limit max 100 acc to current episode
  const [episodeLimit, setEpisodeLimit] = useState(0);

  // to set the episode length to show dropdown value
  const [episodeLength, setEpisodeLength] = useState(-1)

  // to change the dropdown value 
  const [dropdownValue, setDropdownValue] = useState("");

  useEffect(() => {
    let isCancelled = false;
    const getData = async () => {
      if (!isCancelled) {
        const res = await fetchData2(url);
        setData(res);
        setEpisode(res.number);

        // init of the episode limit
        setEpisodeLimit(Math.floor(res.number / 100) * 100 + 1)

        // init of the episode length
        setEpisodeLength(Math.floor(res?.anime?.episodes.length / 100));
        setDropdownValue(`${Math.floor(res?.number / 100) * 100}`);
        if (res) {
          const res2 = await fetchData2(`https://api.enime.moe/source/${res?.sources?.[0].id}`)

          setData2(res2);
          // console.log(episodeLength)
        }
        const res3 = await fetchData2(`https://api.enime.moe/anime/${params.name}`)
        setData3(res3);
      }
    }
    setTimeout(() => {
      if (!isCancelled)
        console.log('hello')
      getData()
    }, 2000);
    return () => {
      isCancelled = true;
    }
  }, [url])
  console.log(data)
  // btn to handle when episode is changed
  const btnHandler = (res) => {
    setUrl(`https://api.enime.moe/view/${res.animeId}/${res.number}`)
  }

  // to handle the dropdown 
  const dropdownHandler = (e) => {
    setEpisodeLimit(e.target.value);
    setDropdownValue(e.target.value)
  }
  return (
    <div className="">
      <Navbar />
      <div className='anime'>
        <div className='main'>
          {(data != undefined) ? (<>
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
                    // to dynamically change the dropdown values
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
                  // to display btn to change episodes
                  data != undefined ? (
                    data?.anime?.episodes.map((data, i) => {
                      return (i > (parseInt(episodeLimit - 2)) && i < (parseInt(episodeLimit) + 100) && (
                        <Link to={`/anime/${params.name}/${data.number}`} key={data.id}>
                          <button res={data} key={data.id}
                            onClick={() => { btnHandler(data) }}
                            className={`btn ${episode == i + 1 ? ' active' : ''}`}>{i + 1}
                          </button>
                        </Link>
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
                      {data3?.format}
                    </div>
                    <div className="rating">
                      PG13
                    </div>
                    <div className="quality">
                      HD
                    </div>
                    <div className="currentEpisode">
                      {params.ep}
                    </div>
                  </div>
                  <div className="info-about__disc">
                    {truncateString(data3?.description)}
                  </div>
                  <div className="main-detail__main">
                    <div className="type">
                      <p className='type-para'>Type : </p>{data3?.format || '?'}
                    </div>
                    <div className="premiered">
                      <p className='premiered-para'> Premiered : </p>{data3?.season === 'UNKNOWN' ? '?' : data3?.season}  {data3?.year || '?'}
                    </div>
                    <div className="status">
                      <p className='status-para'>Status : </p>{data3?.status || '?'}
                    </div>
                    <div className="duration">
                      <p className='duration-para'>Duration : </p>{data3?.duration || '?'}
                    </div>
                    <div className="country">
                      <p className='country-para'>Country : </p>{data3?.countryOfOrigin || '?'}
                    </div>
                    <div className="genre">
                      <p className='genre-para'>Genre : </p>{data3?.genre?.map((gen) => gen + ", ")}
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