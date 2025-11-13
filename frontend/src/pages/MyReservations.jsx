import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { StoreContext } from '../Context/StoreContext'

function MyReservations() {
  const { token, url } = useContext(StoreContext)
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchReservations = async () => {
    if (!token) return
    setLoading(true)
    try {
      const res = await axios.get(`${url}/api/reservation/my`, { headers: { token } })
      if (res.data.success) {
        setReservations(res.data.reservations || [])
      } else {
        setReservations([])
      }
    } catch (e) {
      setReservations([])
    } finally {
      setLoading(false)
    }
  }

  const cancelReservation = async (reservation_id) => {
    try {
      const res = await axios.post(`${url}/api/reservation/cancel`, { reservation_id })
      if (res.data.success) {
        await fetchReservations()
      }
    } catch {}
  }

  useEffect(() => {
    fetchReservations()
  }, [token])

  return (
    <div className='py-6'>
      <h2 className='text-2xl font-bold mb-4'>My Reservations</h2>
      {loading ? (
        <p>Loading...</p>
      ) : reservations.length === 0 ? (
        <p>No reservations found.</p>
      ) : (
        <div className='space-y-4'>
          {reservations.map((r) => (
            <div key={r.reservation_id} className='grid grid-cols-[2fr_1fr_1fr_2fr_1fr] items-center gap-4 p-4 border rounded-lg'>
              <div>
                <p className='font-semibold'>{r.name}</p>
                <p className='text-sm text-gray-600'>{r.email}</p>
              </div>
              <div>
                <p className='font-medium'>{r.reservation_date}</p>
              </div>
              <div>
                <p className='font-medium'>{r.reservation_time}</p>
              </div>
              <div>
                <p className='text-sm text-gray-700'>{r.request || ''}</p>
              </div>
              <button onClick={() => cancelReservation(r.reservation_id)} className='bg-red-500 text-white px-3 py-2 rounded-md'>Cancel</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyReservations

