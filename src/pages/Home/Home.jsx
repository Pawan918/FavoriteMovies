import React from 'react'
import Navbar from '../../Componenets/Navbar/Navbar'
import Card from "../../Componenets/Card/Card";
import PageNav from "../../Componenets/PageNav/PageNav";
import { fetchData } from '../../utilities/fetchData';
import './home.scss'
import { useEffect, useState } from "react";

function Home() {

  const [data, setData] = useState([]);

  // to set the page number on clicking the pageNav
  const [pageNumber, setPageNumber] = useState(1);

  // to change the url according to the user
  const [url, setUrl] = useState('https://api.enime.moe/recent');

  // const [search,setSearch] = useState('');
  // to move to the prevPage
  const prevPage = () => {
    if (pageNumber === 1) return;
    setPageNumber(pageNumber - 1);
    console.log(pageNumber);
  };

  // to move to the NextPage
  const nextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  // to move to any page number
  const skipPage = (val) => {
    if (val !== NaN) setPageNumber(val);
  };

  const urlHandler = (url) => {
    if (url !== '') setUrl(url)
  }
  // to fetch data on pageNumber and url change
  useEffect(() => {
    const getData = async ()=>{

      const res = await fetchData(url,pageNumber);
      setData(res);
    }
    getData();
    // console.log(pageNumber);
  }, [pageNumber, url]);
  console.log(data);
  return (
    //  header of the app
    <div className='home'>
      <Navbar url={urlHandler} setPageNumber={setPageNumber}/>

     {/* cards of the app  */}
      <div className="cards">

        {/* to map the card based on the data  */}
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
      {/* pageNavigation   */}
      <div>
        <PageNav page={{ prevPage, nextPage, skipPage, pageNumber }} />
      </div>
      </div>
  )
}

export default Home
