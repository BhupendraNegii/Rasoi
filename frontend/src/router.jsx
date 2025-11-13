import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Verify from "./pages/Verify";
import MOrders from "./pages/MOrders";
import Reservation from "./pages/Reservation";
import MyReservations from "./pages/MyReservations";



const router=createBrowserRouter([

    {path:'/' , element:<App/>,
        children:[
            {path:'/' , element:<Home/>},
            {path:'menu' , element:<Menu/>},
            {path:'cart' , element:<Cart/>},
            {path:'order' , element:<PlaceOrder/>},
            {path:'verify' , element:<Verify/>},
            {path:'my-order' , element:<MOrders/>},
            {path:'reservation' , element:<Reservation/>},
            {path:'my-reservations' , element:<MyReservations/>},

        ]
    }

]) 

export default router;
