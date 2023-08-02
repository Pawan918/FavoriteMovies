import React from 'react'
import Navbar from './../../Componenets/Navbar/Navbar'
import { useLocation, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { fetchData, fetchData2 } from '../../utilities/fetchData';
import Card from '../../Componenets/Card/Card';
import Loader from '../../Componenets/Loader/Loader';
import PageNav from '../../Componenets/PageNav/PageNav';
function Filter() {
  let queryParams = useLocation().search;
  // console.log(queryParams);
  const [pageNumber, setPageNumber] = useState(1); 
  const [data, setData] = useState([])
  const [data2,setData2] = useState([])
  // const [data2,setData2] = useState([])
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let isCanclled = false;
    setData([]);
    setLoading(true);
    const url = `https://api.jikan.moe/v4/anime${queryParams}&page=${pageNumber}`;
    const getData = async () => {
      const res = await fetchData2(url)
      setData2(res);
      if (!isCanclled) {

        res?.data?.map(async (data1) => {
          await fetchData2(`https://api.enime.moe/mapping/mal/${data1.mal_id}`).then((res) => {
            setLoading(false);
            setData((prevState) => {
              return [...prevState, res]
            })
          })
          // setTimeout(()=>{
        })
      }
    }

    getData();
    return () => {
      isCanclled = true
    }
  }, [pageNumber, queryParams])
  return (
    <div>
      <Navbar />
      {
        loading ? (<Loader/>) : (
          <div className="cards">

          {/* to map the card based on the data  */}
  
                {
                  data != undefined ? (
                    data.map((res) => {
                      // console.log('render')
                      return res?.statusCode != 404 && (
                        <Card res={res} key={res.id} />
                      )
                    })
                  ) : (
                    <Card res={data} key={data.id} />
                  )
                }
  
          {/* <button onClick={handleData}>showData</button> */}
        </div>
        )
      }

      <div>
        <PageNav setPageNumber={setPageNumber} pageNumber={pageNumber} />
      </div>
    </div>
  )
}

export default Filter
