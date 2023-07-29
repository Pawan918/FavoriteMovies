import { useEffect, useState } from "react";


import Home from "./pages/Home/Home";
import Popular from "./pages/Popular/Popular";
import Newest from "./pages/Newest/Newest";
import Anime from "./pages/Anime/Anime";
import Upcoming from "./pages/Upcoming/Upcoming";
import Filter from './pages/Filter/Filter'
import SignIn from './Componenets/SignIn/SignIn'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'

import "./App.scss";
import Search from "./pages/Search/Search";
function App() {

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
        <Route exact path="/:name" element={<Search/>}></Route>
        <Route exact path="/filter" element={<Filter/>}></Route>
        <Route exact path="/signin" element={<SignIn/>}></Route>
      </Routes>
    </div>
    </BrowserRouter>

  );
}

export default App;
