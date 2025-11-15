import { Op } from 'sequelize';
import Reservation from '../models/reservationModel.js';
import ReservationHistory from '../models/reservationHistoryModel.js';

const moveExpiredReservationsToHistory = async () => {
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const timeStr = now.toTimeString().slice(0, 8);

  const expired = await Reservation.findAll({
    where: {
      [Op.or]: [
        { reservation_date: { [Op.lt]: today } },
        { reservation_date: today, reservation_time: { [Op.lte]: timeStr } },
      ],
    },
  });

  for (const r of expired) {
    await ReservationHistory.create({
      name: r.name,
      email: r.email,
      reservation_date: r.reservation_date,
      reservation_time: r.reservation_time,
      request: r.request,
      created_at: r.created_at,
      ended_at: new Date(),
      status: 'expired',
    });
    await Reservation.destroy({ where: { reservation_id: r.reservation_id } });
  }
};

const startReservationCleanup = () => {
  setInterval(() => {
    moveExpiredReservationsToHistory().catch(() => {});
  }, 60 * 1000);
};

export default startReservationCleanup;