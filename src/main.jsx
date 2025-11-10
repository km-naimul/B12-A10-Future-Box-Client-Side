import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './layouts/RootLayout.jsx';
import Home from './components/Home/Home.jsx';
import AddTransaction from './components/AddTransaction/AddTransaction.jsx';
import MyTransactions from './components/MyTransactions/MyTransactions.jsx';
import Reports from './components/Reports/Reports.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'addTransaction',
        Component: AddTransaction
      },
      {
        path: 'mytransactions',
        Component: MyTransactions
      },
      {
        path: 'reports',
        Component: Reports
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />,
  </StrictMode>,
)
