import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import CallLogs from './pages/CallLogs';
import AgentPerformance from './pages/AgentPerformance';
import Tickets from './pages/Tickets';
import TicketDetails from './pages/TicketDetails';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AddCustomer from './pages/AddCustomer';
import CreateTicket from './pages/CreateTicket.tsx';
import AddUser from './pages/AddUser.tsx';
import EditUser from './pages/EditUser.tsx';
import { UserProvider } from './pages/user.tsx';
import { NotificationProvider } from './components/dashboard/NotificationContext';
import './App.css';

function App() {
  return (
    <Router>
      <NotificationProvider>
      <UserProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/customers" element={<Layout><Customers /></Layout>} />
          <Route path="/call-logs" element={<Layout><CallLogs /></Layout>} />
          <Route path="/agent-performance" element={<Layout><AgentPerformance /></Layout>} />
          <Route path="/tickets" element={<Layout><Tickets /></Layout>} />
          <Route path="/tickets/:id" element={<Layout><TicketDetails /></Layout>} />
          <Route path="/reports" element={<Layout><Reports /></Layout>} />
          <Route path="/settings" element={<Layout><Settings /></Layout>} />
          <Route path="*" element={<Layout><NotFound /></Layout>} />
          <Route path="/add-customer" element={<Layout><AddCustomer /></Layout>} />
          <Route path="/create-ticket" element={<Layout><CreateTicket /></Layout>} />
          <Route path="/add-user" element={<Layout><AddUser /></Layout>} />
          <Route path="/edit-user/:id" element={<Layout><EditUser /></Layout>} />
        </Routes>
      </UserProvider>
</NotificationProvider>
    </Router>
  );
}

export default App;
