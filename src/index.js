import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.scss';

import Registration from './components/Registration';
import LogIn from './components/LogIn';
import BaseLayout from './routes/BaseLayout';
import MainPage from './components/MainPage';
import Storage from './components/Storage';

const router = createBrowserRouter([
  { path: '/', element: <MainPage /> },
  {
    path: '',
    element: <BaseLayout />,
    children: [
      { path: '/registration', element: <Registration /> },
      { path: '/login', element: <LogIn /> },
    ],
  },
  { path: '/storage', element: <Storage /> },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
