// src/layouts/MarketLayout.jsx
import { Routes, Route } from 'react-router-dom'
import MarketNavBar    from '../../components/Global-market-components/MarketNavBar'
import MarketFooter    from '../../components/Global-market-components/MarketFooter'
import MarketHome from '../../pages/MarketHome'
import MarketSub from '../../components/Global-market-components/MarketSub'


export default function MarketLayout() {
  return (
    <>
      <MarketNavBar />
      <MarketSub/>
      <main>
        <Routes>
          {/* GET /market             → MarketHome */}
          <Route index element={<MarketHome />} />
          {/* GET /market/stocks      → StocksPage */}
          {/* <Route path="stocks" element={<StocksPage />} /> */}

        </Routes>
      </main>
      <MarketFooter />
      {/* hhhhh */}
    </>
  )
}
