import express from 'express';
import { createReservation, getAllReservations, getAvailableTimeSlots, cancelReservation, getUserReservations, getReservationHistory, getUserReservationHistory } from '../controllers/reservationController.js';
import authMiddleware from '../middlewares/auth.js';

const reservationRouter = express.Router();

// Create a new reservation
reservationRouter.post('/create', authMiddleware, createReservation);

// Get all reservations (optional - for admin)
reservationRouter.get('/all', getAllReservations);

// Get available time slots for a date (optional helper)
reservationRouter.get('/available-slots', getAvailableTimeSlots);

// Cancel a reservation
reservationRouter.post('/cancel', cancelReservation);
reservationRouter.get('/my', authMiddleware, getUserReservations);
reservationRouter.get('/history', getReservationHistory);
reservationRouter.get('/my-history', authMiddleware, getUserReservationHistory);

export default reservationRouter;

