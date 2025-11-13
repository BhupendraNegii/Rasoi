import express from 'express';
import authMiddleware from '../middlewares/auth.js';
import { allOrder, placeOrder, updateStatus, userOrder, verifyOrders } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware , placeOrder);
orderRouter.post("/verify" , verifyOrders);
orderRouter.post("/userorders",authMiddleware , userOrder);
orderRouter.get("/all-order" , allOrder);
orderRouter.post("/update" , updateStatus);






export default orderRouter;