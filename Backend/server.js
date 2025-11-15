import 'dotenv/config'
import express   from 'express';
import cors from 'cors';
import ConnectDb from './config/db.js';
// Import all models to ensure they are registered with Sequelize
import './models/index.js';
import FoodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import authMiddleware from './middlewares/auth.js';
import orderRouter from './routes/orderRoute.js';
import reservationRouter from './routes/reservationRoute.js';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 5000;

//middleware 
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:5176', 'http://localhost:5177', 'http://localhost:3000'],
    credentials: true
}));

//DB connection
ConnectDb().catch(err => {
    console.error('Failed to connect to database:', err);
});

//apiEndPoint 
app.use('/api/food' , FoodRouter);//Food Data
app.use('/api/user' ,userRouter);//For user Login
app.use('/api/cart', cartRouter);//For Cart
app.use('/api/order', orderRouter);//For Order
app.use('/api/reservation', reservationRouter);//For Reservation
app.use('/images' , express.static( 'uploads'));// the uploads folder will be exposed in this endpoint


app.get('/' , (req,res)=>{
    res.send("Api is working")
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});
