import React, { useEffect } from 'react';
import { assets } from '../assets/assets';

function ReservationModal({ modal, closeModal }) {
  useEffect(() => {
    // Auto-close modal after 5 seconds for success messages
    if (modal.type === 'success' && modal.show) {
      const timer = setTimeout(() => {
        closeModal();
      }, 5000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal.type, modal.show]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade"
      onClick={closeModal}
    >
      <div
        className={`relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 animate-fade2 ${
          modal.type === 'success' ? 'border-2 border-green-500' : 'border-2 border-red-500'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <img src={assets.cross_icon} className="w-5 h-5" alt="Close" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          {modal.type === 'success' ? (
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          ) : (
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Message */}
        <div className="text-center">
          <h3
            className={`text-2xl font-bold mb-3 ${
              modal.type === 'success' ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {modal.type === 'success' ? 'Success!' : 'Error'}
          </h3>
          <p className="text-[#262626] text-lg mb-6">{modal.message}</p>

          {/* Close Button */}
          <button
            onClick={closeModal}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
              modal.type === 'success'
                ? 'bg-[#2d5016] text-white hover:bg-[#3d7026]'
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReservationModal;

