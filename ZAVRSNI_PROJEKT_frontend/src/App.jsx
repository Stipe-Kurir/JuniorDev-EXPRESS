import { useState, useEffect } from 'react';
import './App.css';
import UserContext from './components/Context/UserContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Donacije from './pages/Donacije/Donacije';
import Obavijesti from './pages/Obavijesti/Obavijesti';
import Unos from './pages/Unos/Unos';
import Popis from './pages/Popis/Popis';
import Home from './pages/Home/Home';
import axios from 'axios';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/donacije',
    element: <Donacije />,
  },
  {
    path: '/obavijesti',
    element: <Obavijesti />,
  },
  {
    path: '/popis',
    element: <Popis />,
  },
  {
    path: '/unos',
    element: <Unos />,
  },
]);


function App() {
  return (
    <div className="AppContainer">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
