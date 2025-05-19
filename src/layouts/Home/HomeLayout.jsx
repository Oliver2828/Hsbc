// src/layouts/HomeLayout.jsx
import { Routes, Route } from 'react-router-dom'
import HomeNavBar from '../../components/Home-components/HomeNavBar'
import HomeFooter from '../../components/Home-components/HomeFooter'
import HomePage    from '../../pages/Homepage'
import Login from '../../components/Home-components/Login'

export default function HomeLayout() {
  return (
    <>
      <HomeNavBar />
      <main>
        <Routes>
          {/* GET /               → HomePage */}
          <Route index element={<HomePage />} />
          {/* GET /login          → LoginPage */}
          <Route path="login" element={<Login />} />
        </Routes>
      </main>
      <HomeFooter />
    </>
  )
}
