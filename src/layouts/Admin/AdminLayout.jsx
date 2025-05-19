// src/layouts/Admin/AdminLayout.jsx
import { Routes, Route } from 'react-router-dom'
import AdminNavBar from '../../components/Admin-components/AdminNavBar'
import AdminFooter from '../../components/Admin-components/AdminFooter'
import AdminDashboard from '../../pages/AdminDashboard'
import ManageUsers from '../../components/Admin-components/ManagerUsers'

export default function AdminLayout() {
  return (
    <>
      <AdminNavBar />
      <main>
        <Routes>
          <Route index element={<AdminDashboard />} />
          <Route path="manage-users" element={<ManageUsers />} />
        </Routes>
      </main>
      <AdminFooter />
    </>
  )
}
