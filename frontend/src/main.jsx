import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'virtual:windi.css'
import { RouterProvider } from 'react-router-dom'
import router from './router.jsx'
import StoreContextProvider from './Context/StoreContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 <StoreContextProvider >
     <RouterProvider router={router}/>
 </StoreContextProvider>
)
