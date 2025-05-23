import { Routes, Route } from 'react-router-dom';
import UserDashboard from '../../pages/UserDashboard';
import Dashboard from '../../components/User-components/Dashoard'; // Fixed typo in import
import Transactions from '../../components/User-components/Transactions';
import Deposit from '../../components/User-components/Deposit';
import Cards from '../../components/User-components/Cards';
import LocalTransfer from '../../components/User-components/LocalTransfer';
import InternationalTransfer from '../../components/User-components/InternationalTransfer';
import PayBills from '../../components/User-components/PayBills';
import Loans from '../../components/User-components/Loans';
import Savings from '../../components/User-components/Savings';
import Investments from '../../components/User-components/Investments';

export default function UserLayout() {
  return (
    <Routes>
      <Route path="/*" element={<UserDashboard />}>
        <Route index element={<Dashboard />} /> {/* Added index route */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="deposit" element={<Deposit />} />
        <Route path="cards" element={<Cards />} />
        <Route path="local-transfer" element={<LocalTransfer />} />
        <Route path="international-transfer" element={<InternationalTransfer />} />
        <Route path="pay-bills" element={<PayBills />} />
        <Route path="loans" element={<Loans />} />
        <Route path="savings" element={<Savings />} />
        <Route path="investments" element={<Investments />} />
      </Route>
    </Routes>
  );
}