import React, { useEffect } from 'react'
import { fetchData, fetchData2 } from '../../../utilities/fetchData'

function Season(props) {

    useEffect(()=>{
        let url = `https://api.jikan.moe/v4/anime/${props.malId}/relations`
        const getData = async()=>{
            const res = await fetchData2(url)
            console.log(res)
        }
        getData();
    })
  return (
    <div>
      More Season
    </div>
  )
}

export default Season
