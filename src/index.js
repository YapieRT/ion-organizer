import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.scss';

import Registration from './containers/Registration/Registration';
import LogIn from './containers/Login/LogIn';
import BaseLayout from './routes/BaseLayout';
import MainPage from './containers/MainPage';
import Storage from './containers/Storage/Storage';
import Inventarization from './containers/Storage/Inventarization/Inventarization';

const router = createBrowserRouter([
  { path: '/', element: <MainPage /> },
  {
    path: '',
    element: <BaseLayout linkTo='/' />,
    children: [
      { path: '/registration', element: <Registration /> },
      { path: '/login', element: <LogIn /> },
    ],
  },

  {
    path: '',
    element: <BaseLayout linkTo='/storage' />,
    children: [
      { path: '/storage/inventarization', element: <Inventarization /> },
      { path: '/storage', element: <Storage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
