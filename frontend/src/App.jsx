import React from 'react'
import TopBarComponet from './components/TopBarComponet'
import ContentWrapper from './components/ContentWrapper'
import LoginComponent from './components/LoginComponent'
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import DashboardComponent from './components/DashboardComponent'
import AppRoutes from './utils/AppRoutes'

function App() {
  const router = createBrowserRouter(AppRoutes)
  return (
    <>
    {/* <TopBarComponet/> */}
      <RouterProvider router={router} />
    </>

  )
}

export default App