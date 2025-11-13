import React, { useState, useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';
import axios from 'axios';
import ReservationModal from '../components/ReservationModal';

function Reservation() {
  const { url, token } = useContext(StoreContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reservation_date: '',
    reservation_time: '',
    request: '',
  });

  const [modal, setModal] = useState({ show: false, type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (!formData.name || !formData.email || !formData.reservation_date || !formData.reservation_time) {
      setModal({
        show: true,
        type: 'error',
        message: 'Please fill in all required fields (Name, Email, Date, Time)',
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${url}/api/reservation/create`, formData, { headers: token ? { token } : {} });

      if (response.data.success) {
        setModal({
          show: true,
          type: 'success',
          message: response.data.message || 'Reservation booked successfully!',
        });
        // Reset form
        setFormData({
          name: '',
          email: '',
          reservation_date: '',
          reservation_time: '',
          request: '',
        });
      } else {
        setModal({
          show: true,
          type: 'error',
          message: response.data.message || 'Failed to book reservation. Please try again.',
        });
      }
    } catch (error) {
      console.error('Reservation error:', error);
      setModal({
        show: true,
        type: 'error',
        message: error.response?.data?.message || 'An error occurred. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModal({ show: false, type: '', message: '' });
  };

  // Get today's date in YYYY-MM-DD format for min attribute
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Generate time slots (10:00 AM to 9:00 PM) in HH:MM:SS format
  const timeSlots = [];
  for (let hour = 10; hour <= 21; hour++) {
    const time = `${hour.toString().padStart(2, '0')}:00:00`;
    const displayTime = `${hour.toString().padStart(2, '0')}:00`;
    timeSlots.push({ value: time, display: displayTime });
  }

  return (
    <>
      {modal.show && <ReservationModal modal={modal} closeModal={closeModal} />}
      
      <div className="relative min-h-[80vh] flex items-center justify-center py-12 px-4">
        {/* Blurred Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d5016]/10 via-[#f8f9fa] to-[#ffffff] rounded-[24px] backdrop-blur-sm"></div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-2xl">
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#2d5016] mb-2">Your Reservation</h1>
            <p className="text-[#808080]">Book a table at Rasoi for an unforgettable dining experience</p>
          </div>

          {/* Card Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 animate-fade">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-[#262626] font-semibold">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-[#e0e0e0] rounded-lg px-4 py-3 outline-none focus:border-[#2d5016] focus:ring-2 focus:ring-[#2d5016]/20 transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[#262626] font-semibold">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="border border-[#e0e0e0] rounded-lg px-4 py-3 outline-none focus:border-[#2d5016] focus:ring-2 focus:ring-[#2d5016]/20 transition-all"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              {/* Date and Time Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="reservation_date" className="text-[#262626] font-semibold">
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="reservation_date"
                    name="reservation_date"
                    value={formData.reservation_date}
                    onChange={handleChange}
                    min={getTodayDate()}
                    className="border border-[#e0e0e0] rounded-lg px-4 py-3 outline-none focus:border-[#2d5016] focus:ring-2 focus:ring-[#2d5016]/20 transition-all"
                    required
                  />
                </div>

                {/* Time Field */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="reservation_time" className="text-[#262626] font-semibold">
                    Time <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="reservation_time"
                    name="reservation_time"
                    value={formData.reservation_time}
                    onChange={handleChange}
                    className="border border-[#e0e0e0] rounded-lg px-4 py-3 outline-none focus:border-[#2d5016] focus:ring-2 focus:ring-[#2d5016]/20 transition-all"
                    required
                  >
                    <option value="">Select a time</option>
                    {timeSlots.map((time) => (
                      <option key={time.value} value={time.value}>
                        {time.display}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Request Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="request" className="text-[#262626] font-semibold">
                  Special Request (Optional)
                </label>
                <textarea
                  id="request"
                  name="request"
                  value={formData.request}
                  onChange={handleChange}
                  rows="4"
                  className="border border-[#e0e0e0] rounded-lg px-4 py-3 outline-none focus:border-[#2d5016] focus:ring-2 focus:ring-[#2d5016]/20 transition-all resize-none"
                  placeholder="Any special requests or dietary requirements?"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`mt-4 bg-[#2d5016] text-white font-semibold py-4 px-8 rounded-[50px] cursor-pointer hover:bg-[#3d7026] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                  loading ? 'opacity-50' : ''
                }`}
              >
                {loading ? 'Booking...' : 'Book Now'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Reservation;

