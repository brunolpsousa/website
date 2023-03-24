import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '/src/style/tailwind.css'

import Index from '/src/components/Index.jsx'
import ButtomTheme from './components/ButtonTheme.jsx'
import Footer from './components/Footer.jsx'
import ThankYou from '/src/components/ThankYou.jsx'
import ErrorPage from '/src/components/ErrorPage.jsx'

const redirect = () => {
  let url = 'brunolpsousa.duckdns.org'
  let hostname = location.hostname
  if (hostname !== url && hostname !== 'localhost') {
    window.location.replace('https://' + url)
  }
}
redirect()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'thanks',
    element: <ThankYou />,
  },
])

createRoot(document.getElementById('root')).render(
  <>
    <ButtomTheme />
    <RouterProvider router={router} />
    <Footer />
  </>
)
