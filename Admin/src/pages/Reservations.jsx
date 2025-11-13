import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

function Reservations() {
  const url = 'http://localhost:5001';
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllReservations = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/reservation/all`);
      if (response.data.success) {
        setReservations(response.data.reservations || []);
      } else {
        toast.error(response.data.message || 'Error fetching reservations');
      }
    } catch (error) {
      console.error('Error fetching reservations:', error);
      toast.error('Error fetching reservations');
    } finally {
      setLoading(false);
    }
  };

  const cancelReservation = async (reservationId) => {
    if (!window.confirm('Are you sure you want to cancel this reservation?')) {
      return;
    }

    try {
      const response = await axios.post(`${url}/api/reservation/cancel`, {
        reservation_id: reservationId,
      });

      if (response.data.success) {
        toast.success('Reservation canceled successfully');
        await fetchAllReservations();
      } else {
        toast.error(response.data.message || 'Error canceling reservation');
      }
    } catch (error) {
      console.error('Error canceling reservation:', error);
      toast.error(error.response?.data?.message || 'Error canceling reservation');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    // Handle YYYY-MM-DD format
    const date = new Date(dateString + 'T00:00:00');
    if (isNaN(date.getTime())) {
      return dateString; // Return original if invalid
    }
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    // Convert HH:MM:SS to HH:MM AM/PM format
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  useEffect(() => {
    fetchAllReservations();
  }, []);

  // Group reservations by date for better display
  const reservationsByDate = {};
  reservations.forEach((reservation) => {
    const date = reservation.reservation_date;
    if (!reservationsByDate[date]) {
      reservationsByDate[date] = [];
    }
    reservationsByDate[date].push(reservation);
  });

  return (
    <>
      <div className="w-full py-1 px-2 font-mukta">
        <h1 className="text-center text-2xl mb-6">Reservations Management</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white border border-orange-500 rounded-lg p-4">
            <p className="text-[#505050] text-sm">Total Reservations</p>
            <p className="text-2xl font-bold text-[#2d5016]">{reservations.length}</p>
          </div>
          <div className="bg-white border border-orange-500 rounded-lg p-4">
            <p className="text-[#505050] text-sm">Today's Reservations</p>
            <p className="text-2xl font-bold text-[#2d5016]">
              {reservations.filter(
                (r) => r.reservation_date === new Date().toISOString().split('T')[0]
              ).length}
            </p>
          </div>
          <div className="bg-white border border-orange-500 rounded-lg p-4">
            <p className="text-[#505050] text-sm">Upcoming Reservations</p>
            <p className="text-2xl font-bold text-[#2d5016]">
              {reservations.filter((r) => {
                const reservationDate = new Date(r.reservation_date);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                reservationDate.setHours(0, 0, 0, 0);
                return reservationDate >= today;
              }).length}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-[#505050]">Loading reservations...</p>
          </div>
        ) : reservations.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-[#505050]">No reservations found</p>
          </div>
        ) : (
          <div className="container">
            {/* Table Header */}
            <div className="grid rounded-lg border-[1px] border-orange-500 p-5 my-[30px] mx-0 text-[14px] text-[#505050] grid-cols-[1fr_1.5fr_1fr_1fr_1fr_1fr_1fr_0.5fr] items-start bg-[#ffe8e4] font-semibold">
              <p>ID</p>
              <p>Name</p>
              <p>Email</p>
              <p>Date</p>
              <p>Time</p>
              <p>Seats</p>
              <p>Request</p>
              <p>Action</p>
            </div>

            {/* Reservations List */}
            {reservations.map((reservation, index) => (
              <div
                key={index}
                className="grid rounded-lg border-[1px] border-orange-500 p-5 my-[10px] mx-0 text-[14px] text-[#505050] grid-cols-[1fr_1.5fr_1fr_1fr_1fr_1fr_1fr_0.5fr] items-start hover:bg-[#fff5f3] transition-colors"
              >
                <p className="font-semibold">#{reservation.reservation_id}</p>

                <div className="font-semibold">
                  <p>{reservation.name || 'N/A'}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {reservation.created_at
                      ? new Date(reservation.created_at).toLocaleString()
                      : 'N/A'}
                  </p>
                </div>

                <p className="text-sm break-words">{reservation.email || 'N/A'}</p>

                <div>
                  <p className="font-semibold">{formatDate(reservation.reservation_date)}</p>
                  <p className="text-xs text-gray-500">
                    {reservation.seatsBooked !== undefined
                      ? `${reservation.seatsBooked}/20 seats`
                      : 'N/A'}
                  </p>
                </div>

                <p className="font-semibold">{formatTime(reservation.reservation_time)}</p>

                <div>
                  <p className="font-semibold text-[#2d5016]">
                    {reservation.seatsBooked !== undefined
                      ? `${reservation.seatsBooked}/20`
                      : 'N/A'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {reservation.availableSeats !== undefined
                      ? `${reservation.availableSeats} available`
                      : 'N/A'}
                  </p>
                </div>

                <p className="text-sm break-words">
                  {reservation.request ? (
                    <span title={reservation.request}>
                      {reservation.request.length > 30
                        ? `${reservation.request.substring(0, 30)}...`
                        : reservation.request}
                    </span>
                  ) : (
                    <span className="text-gray-400">No request</span>
                  )}
                </p>

                <button
                  onClick={() => cancelReservation(reservation.reservation_id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors cursor-pointer text-xs font-semibold"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Date-wise Summary */}
        {Object.keys(reservationsByDate).length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Reservations by Date</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.keys(reservationsByDate)
                .sort()
                .map((date) => (
                  <div
                    key={date}
                    className="bg-white border border-orange-500 rounded-lg p-4"
                  >
                    <p className="font-semibold text-[#2d5016] mb-2">{formatDate(date)}</p>
                    <p className="text-sm text-[#505050]">
                      {reservationsByDate[date].length} reservation
                      {reservationsByDate[date].length !== 1 ? 's' : ''}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {20 - reservationsByDate[date].length} seats available
                    </p>
                    <div className="mt-2 space-y-1">
                      {reservationsByDate[date].slice(0, 3).map((reservation, idx) => (
                        <p key={idx} className="text-xs text-gray-600">
                          {formatTime(reservation.reservation_time)} - {reservation.name}
                        </p>
                      ))}
                      {reservationsByDate[date].length > 3 && (
                        <p className="text-xs text-gray-400">
                          +{reservationsByDate[date].length - 3} more
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Reservations;

