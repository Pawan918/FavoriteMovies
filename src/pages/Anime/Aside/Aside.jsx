import React, { useEffect, useState } from 'react'
import { fetchData2 } from '../../../utilities/fetchData'
import Card from './../../../Componenets/Card/Card'
import './aside.scss'

function Aside() {
    const [data,setData] = useState([]);
    const [url,setUrl] = useState('https://api.enime.moe/popular?perPage=3')
    useEffect(() => {
        const getData = async ()=>{
    
          const res = await fetchData2(url);
          setData(res);
        }
        getData();
        // console.log(pageNumber);
      }, []);
      const urlHandler = (url) => {
        if (url !== '') setUrl(url)
      }
  return (
    <div className='aside-main'>
        <div className='heading'>
            RELATED ANIME
        </div>
        <div className='main'>
        {
          data.data != undefined ? (
            data?.data.map((res) => {
              return <Card res={res} key={res.id} url={urlHandler} />;
            })
          ) : (
            <Card res={data} key={data.id} url={urlHandler} />
          )
        }
        </div>
    </div>
  )
}

export default Aside
