import { useEffect, useState } from "react";


import Home from "./pages/Home/Home";
import Popular from "./pages/Popular/Popular";
import Newest from "./pages/Newest/Newest";
import Anime from "./pages/Anime/Anime";
import Upcoming from "./pages/Upcoming/Upcoming";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'

import "./App.scss";
function App() {
  // to set the data
  // const [data, setData] = useState([]);

  // // to set the page number on clicking the pageNav
  // const [pageNumber, setPageNumber] = useState(1);

  // // to change the url according to the user
  // const [url, setUrl] = useState('https://api.enime.moe/recent');

  // // const [search,setSearch] = useState('');
  // // to move to the prevPage
  // const prevPage = () => {
  //   if (pageNumber === 1) return;
  //   setPageNumber(pageNumber - 1);
  //   console.log(pageNumber);
  // };

  // // to move to the NextPage
  // const nextPage = () => {
  //   setPageNumber(pageNumber + 1);
  // };

  // // to move to any page number
  // const skipPage = (val) => {
  //   if (val !== NaN) setPageNumber(val);
  // };

  // const urlHandler = (url) => {
  //   if (url !== '') setUrl(url)
  // }
  // // to fetch data on pageNumber and url change
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `${url}?page=${pageNumber}`,
  //         {
  //           method: "GET",
  //         }
  //       );
  //       const res = await response.json();
  //       setData(res);
  //       console.log(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchData();
  //   // console.log(pageNumber);
  // }, [pageNumber, url]);
  // console.log(data)
  // console.log(data?.slug)
  return (
      <BrowserRouter >
      <div className="app">
      <Routes>
        <Route exact path='/' element={<Home/>}>
        </Route>
        <Route exact path='/popular'element={<Popular/>}>
        </Route>
        <Route exact path='/newest' element={<Newest/>}>
        </Route>
        <Route exact path='/anime/:name/:ep' element={<Anime/>}>
        </Route>
        <Route exact path = '/upcoming' element={<Upcoming/>}></Route>
      </Routes>
    </div>
    </BrowserRouter>

  );
}

export default App;
