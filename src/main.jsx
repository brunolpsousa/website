import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import '/src/style/tailwind.css'

import Index from '/src/components/Index'
import ButtomTheme from './components/ButtonTheme'
import Footer from './components/Footer'
import ThankYou from '/src/components/ThankYou'
import ErrorPage from '/src/components/ErrorPage'

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
    <div className='bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200 font-inter'>
      <div className='flex flex-col items-center h-screen max-w-5xl w-11/12 m-auto'>
        <RouterProvider router={router} />
        <Footer />
      </div>
    </div>
  </>
)
