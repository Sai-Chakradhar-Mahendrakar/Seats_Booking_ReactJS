// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// export default {
//   base: '/Seats_Booking_ReactJS/',
// };

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Seats_Booking_ReactJS/', // Set the base path for GitHub Pages
  plugins: [react()],
});

