import Reservation from '../models/reservationModel.js';
import validator from 'validator';
import User from '../models/userModel.js';

// Create a new reservation
const createReservation = async (req, res) => {
  const { name, email, reservation_date, reservation_time, request } = req.body;

  try {
    // Validate required fields
    if (!name || !email || !reservation_date || !reservation_time) {
      return res.json({
        success: false,
        message: 'Please fill in all required fields (Name, Email, Date, Time)',
      });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: 'Please enter a valid email address',
      });
    }

    // Validate date is not in the past
    const selectedDate = new Date(reservation_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return res.json({
        success: false,
        message: 'Cannot book reservations for past dates',
      });
    }

    // Check total reservations for the date (limit: 20 seats per date)
    const reservationsForDate = await Reservation.count({
      where: {
        reservation_date: reservation_date,
      },
    });

    if (reservationsForDate >= 20) {
      return res.json({
        success: false,
        message: 'Sorry, all seats for this date are booked. Please choose another date.',
      });
    }

    // Check if the specific time slot is already taken (only one booking per time slot)
    const existingReservation = await Reservation.findOne({
      where: {
        reservation_date: reservation_date,
        reservation_time: reservation_time,
      },
    });

    if (existingReservation) {
      return res.json({
        success: false,
        message: 'This time slot is already booked. Please choose another time.',
      });
    }

    // If user is authenticated, use account email/name for association
    let finalName = name;
    let finalEmail = email;
    if (req.body.userId) {
      const user = await User.findByPk(req.body.userId);
      if (user) {
        finalEmail = user.Email;
        finalName = finalName || user.user_name;
      }
    }

    const reservation = await Reservation.create({
      name: finalName,
      email: finalEmail,
      reservation_date,
      reservation_time,
      request: request || null,
      created_at: new Date(),
    });

    return res.json({
      success: true,
      message: 'Reservation booked successfully!',
      reservation: {
        reservation_id: reservation.reservation_id,
        name: reservation.name,
        email: reservation.email,
        reservation_date: reservation.reservation_date,
        reservation_time: reservation.reservation_time,
        request: reservation.request,
      },
    });
  } catch (error) {
    console.error('Reservation error:', error);
    return res.json({
      success: false,
      message: 'An error occurred while processing your reservation. Please try again.',
      error: error.message,
    });
  }
};

// Get all reservations (for admin purposes - optional)
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      order: [['reservation_date', 'ASC'], ['reservation_time', 'ASC']],
    });

    // Group reservations by date and calculate seat count
    const reservationsByDate = {};
    reservations.forEach((reservation) => {
      const date = reservation.reservation_date;
      if (!reservationsByDate[date]) {
        reservationsByDate[date] = [];
      }
      reservationsByDate[date].push(reservation);
    });

    // Add seat count for each reservation
    const reservationsWithSeatInfo = reservations.map((reservation) => {
      const date = reservation.reservation_date;
      const dateReservations = reservationsByDate[date] || [];
      const seatsBooked = dateReservations.length;
      return {
        ...reservation.toJSON(),
        seatsBooked,
        totalSeats: 20,
        availableSeats: Math.max(0, 20 - seatsBooked),
      };
    });

    return res.json({
      success: true,
      reservations: reservationsWithSeatInfo,
      totalReservations: reservations.length,
    });
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return res.json({
      success: false,
      message: 'Error fetching reservations',
      error: error.message,
    });
  }
};

// Get available time slots for a date (optional helper endpoint)
const getAvailableTimeSlots = async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.json({
      success: false,
      message: 'Date is required',
    });
  }

  try {
    // Get all reservations for the date
    const reservations = await Reservation.findAll({
      where: {
        reservation_date: date,
      },
      attributes: ['reservation_time'],
    });

    const bookedTimes = reservations.map((r) => r.reservation_time);

    // Generate common time slots (you can customize these)
    const timeSlots = [
      '10:00:00',
      '11:00:00',
      '12:00:00',
      '13:00:00',
      '14:00:00',
      '15:00:00',
      '16:00:00',
      '17:00:00',
      '18:00:00',
      '19:00:00',
      '20:00:00',
      '21:00:00',
    ];

    const availableSlots = timeSlots.filter((slot) => !bookedTimes.includes(slot));

    return res.json({
      success: true,
      availableSlots,
      bookedTimes,
      totalReservations: reservations.length,
    });
  } catch (error) {
    console.error('Error fetching time slots:', error);
    return res.json({
      success: false,
      message: 'Error fetching available time slots',
      error: error.message,
    });
  }
};

// Cancel a reservation
const cancelReservation = async (req, res) => {
  const { reservation_id } = req.body;

  try {
    if (!reservation_id) {
      return res.json({
        success: false,
        message: 'Reservation ID is required',
      });
    }

    // Find the reservation
    const reservation = await Reservation.findOne({
      where: {
        reservation_id: reservation_id,
      },
    });

    if (!reservation) {
      return res.json({
        success: false,
        message: 'Reservation not found',
      });
    }

    // Delete the reservation
    await Reservation.destroy({
      where: {
        reservation_id: reservation_id,
      },
    });

    return res.json({
      success: true,
      message: 'Reservation canceled successfully',
    });
  } catch (error) {
    console.error('Error canceling reservation:', error);
    return res.json({
      success: false,
      message: 'An error occurred while canceling the reservation',
      error: error.message,
    });
  }
};

export { createReservation, getAllReservations, getAvailableTimeSlots, cancelReservation };
const getUserReservations = async (req, res) => {
  try {
    const user = await User.findByPk(req.body.userId);
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }
    const reservations = await Reservation.findAll({ where: { email: user.Email }, order: [['reservation_date','ASC'], ['reservation_time','ASC']] });
    return res.json({ success: true, reservations });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
export { getUserReservations };

