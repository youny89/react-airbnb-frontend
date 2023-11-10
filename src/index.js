import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import Home from './pages/Home';
import ListingPage from './pages/Listing';
import TripPage from './pages/Trip';
import ReservationPage from './pages/Reservation';
import FavoritePage from './pages/Favorite';
import Myhouse from './pages/Myhouse';

const router = createBrowserRouter([
  {
    path:'/',
    element:<App />,
    children:[
      {
        index:true,
        element:<Home />
      },
      {
        path:"/listings/:id",
        element:<ListingPage />
      },
      {
        path:'/trip',
        element: <TripPage />
      },
      {
        path:'/reservation',
        element: <ReservationPage />
      },
      {
        path:'/favorite',
        element: <FavoritePage />
      },
      {
        path:'/my-house',
        element: <Myhouse />
      }
    ]
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
