# ShebaSathi Frontend

ShebaSathi is a service-oriented healthcare support platform for people who need help with medical appointments, transport, accommodation, and patient support in Dhaka.

The main goal is to support rural families, elderly patients, and expatriates who need trusted help for their relatives in Bangladesh.

## Live Site

https://shebasathi-next.vercel.app

## Main Features

- Doctor appointment booking
- Transport / ambulance booking
- Hotel / accommodation booking
- User registration and login
- User dashboard
- Booking slip view
- WhatsApp support
- Mobile-first design
- Admin dashboard support through backend API

## Tech Stack

- Next.js
- React
- Tailwind CSS
- Context API
- Vercel deployment

## Project Structure

```txt
app/
  page.js
  layout.js
  globals.css
  doctors/
  services/
  hotel/
  transport/
  book/
  dashboard/
  login/
  register/
  otp/
  admin/

components/
  Navbar.jsx
  MobileBottomNav.jsx
  DoctorCard.jsx
  BookingSuccessModal.jsx
  BookingSlipModal.jsx

context/
  AuthContext.js