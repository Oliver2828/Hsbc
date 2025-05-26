import { Routes, Route } from 'react-router-dom';
import AdminDashboard from '../../pages/AdminDashboard'
import AdDashboard from '../../components/Admin-components/AdDashboard';
import ManageUsers from '../../components/Admin-components/ManagerUsers' // Fixed import

export default function AdminLayout() { // Fixed function name
  return (
    <Routes>
      <Route path="/*" element={<AdminDashboard />}>
        <Route index element={<AdDashboard />} />
        <Route path="manage" element={<ManageUsers />} />
      </Route>
    </Routes>
  );
}