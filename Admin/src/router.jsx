import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Reservations from "./pages/Reservations";

const router = createBrowserRouter([
    {path:'/' , 
        element:<App/>,
         children:[
            {path:'/', element:<List/>},
            {path:'add' , element:<Add/>},
            {path:'list' , element:<List/>},
            {path:'order' , element:<Orders/>},
            {path:'reservations' , element:<Reservations/>}
         ]
    }
])

export default router