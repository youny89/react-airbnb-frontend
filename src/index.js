import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import Home from './pages/Home';
import ListingPage from './pages/Listing';
import TripPage from './pages/Trip';

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
