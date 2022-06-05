import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarView from "../Common/Components/Navbar/NavbarView"
import CreateListController from '../Areas/Lists/CreateList/Controller/CreateListController'
import ListDetailsController from '../Areas/Lists/ListDetails/Controller/ListDetailsController'
import HomeController from '../Areas/Home/Controller/HomeController'
import '../Common/CSS/App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <NavbarView />
        </header>
        <Routes>
          <Route path='/createList' element={<CreateListController />} />
          <Route path='/:list_name' element={<ListDetailsController />} />
          <Route path='/' element={<HomeController />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
