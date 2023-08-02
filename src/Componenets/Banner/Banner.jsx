import React from 'react'
import { useState, useEffect, useRef } from 'react';
import './banner.scss';
import { fetchData2 } from '../../utilities/fetchData';
import { Link, useNavigate } from 'react-router-dom';
import { titleCase2 } from '../../utilities/titleCase';
import Loader from '../Loader/Loader';
const delay = 5000;
function Banner() {
  const [data, setData] = useState([])
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false)
  const timeoutRef = useRef(null);
  const navigate = useNavigate();
  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }
  const imageHandler = async (res) => {
    setLoading(true);
    const mal_id = res?.mal_id;
    const data = await fetchData2(`https://api.enime.moe/mapping/mal/${mal_id}`)
    console.log(data);
    console.log(data.slug)
    navigate(`/anime/${data?.slug}/1`);
  }
  const isCancelled = useRef(false);
  useEffect(() => {
    const getData = async () => {
        await fetchData2(`https://api.jikan.moe/v4/seasons/now?limit=10`).then((res)=>{
          setLoading(false);
          setData(res.data);
        });
    }
    if(!isCancelled.current){
      getData();
    }
    // console.log('hello')
    return () => {
      isCancelled.current = true;
    }
  }, [])
  //   console.log(data)
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === data?.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );
    return () => {
      resetTimeout();
    };
  }, [index]);
  return (
    <div className="slideshow">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className='backDrop'></div>
          <div
            className="slideshowSlider"
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
          >
            {data?.map((res, index) => (
              <div className="slide" key={index} onClick={() => { imageHandler(res) }}>
                <img className="slide__image" src={res?.trailer?.images?.maximum_image_url} alt="" />
              </div>
            ))}
          </div>
        </>
      )}
    </div>

  )
}

export default Banner
