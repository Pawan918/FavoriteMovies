import { useEffect, useState } from "react";


import Home from "./pages/Home/Home";
import Popular from "./pages/Popular/Popular";
import Newest from "./pages/Newest/Newest";
import Anime from "./pages/Anime/Anime";
import Upcoming from "./pages/Upcoming/Upcoming";
import Filter from './pages/Filter/Filter'
import Signup from './Componenets/Signup/Signup'
import Login from "./Componenets/Login/login";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'

import "./App.scss";
import Search from "./pages/Search/Search";
function App() {

  return (
    <div className="app">
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/popular' element={<Popular />} />
        <Route exact path='/newest' element={<Newest />} />
        <Route exact path='/anime/:name/:ep' element={<Anime />} />
        <Route exact path='/upcoming' element={<Upcoming />} />
        <Route exact path="/:name" element={<Search />} />
        <Route exact path="/filter" element={<Filter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>

  );
}

export default App;
