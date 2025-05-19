// src/layouts/User/UserLayout.jsx
import { Routes, Route } from 'react-router-dom'
import UserNavBar from '../../components/User-components/UserNavBar'
import UserFooter from '../../components/User-components/UserFooter'
import UserDashboard from '../../pages/UserDashboard'
// import UserSettings from '../../pages/user/UserSettings'

export default function UserLayout() {
  return (
    <>
      <UserNavBar />
      <main>
        <Routes>
          <Route index element={<UserDashboard />} />
          {/* <Route path="settings" element={<UserSettings />} /> */}
        </Routes>
      </main>
      <UserFooter />
    </>
  )
}
