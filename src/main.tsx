import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CarSeatBookingApp from './CarSeatBookingApp'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CarSeatBookingApp />
  </StrictMode>,
)
