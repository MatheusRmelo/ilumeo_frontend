import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import AuthView from './views/AuthView';
import RegistersView from './views/RegistersView';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthView />
  },
  {
    path: '/registros',
    element: <RegistersView />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
