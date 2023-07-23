import React from 'react'
import Navbar from '../../Componenets/Navbar/Navbar'
import Card from "../../Componenets/Card/Card";
import PageNav from "../../Componenets/PageNav/PageNav";
import { fetchData } from '../../utilities/fetchData';
import './home.scss'
import { useEffect, useState } from "react";
import Filter from '../../Componenets/Filter/Filter';
import Banner from '../../Componenets/Banner/Banner';
import Loader from '../../Componenets/Loader/Loader';

function Home() {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  // to set the page number on clicking the pageNav
  const [pageNumber, setPageNumber] = useState(1);

  const url = 'https://api.enime.moe/recent';


  // to fetch data on pageNumber change
  useEffect(() => {
    let isCancelled = false;
    setLoading(true);
    const getData = async () => {
      const res = await fetchData(url, pageNumber).then((res) => {
        setLoading(false);
        setData(res);
      });}
      //   if (!isCancelled && res) {
      //     setLoading(false)
      //     setData(res);
      //   }
      // }
      // setTimeout(() => {
      //   setLoading(false);
      getData();
      // }, 2000)

      return () => {
        isCancelled = true;
      }
      // console.log(pageNumber);
    }, [pageNumber]);
  console.log(data);
  return (
    //  header of the app
    <div className='home'>
      <Navbar />
      <Banner />
      {/* cards of the app  */}
      {
        loading ? (
          <Loader />
        ) : (
          <>
          <Filter/>
            <div className="cards">
              {/* to map the card based on the data  */}
              {
                data.data != undefined ? (
                  data?.data.map((res) => {
                    return <Card res={res} key={res.id} />;
                  })
                ) : (
                  <Card res={data} key={data.id} />
                )
              }
            </div>
            <div>
              <PageNav setPageNumber={setPageNumber} pageNumber={pageNumber} />
            </div>
          </>
        )
      }
    </div>
  )
}

export default Home
