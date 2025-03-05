import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MaintananceDashboard from './MaintananceDashboard'; // Import the dashboard component
import FinancialTransactions from './FinancialTransactions'; // Import the financial transactions component
import SalesManagement from './SalesManagement'; // Import the sales management component

function SalesRoutes() {
  return (
    <Routes>
      <Route path="/sales-management" element={<SalesManagement />} />
      <Route path="/sales-management/financial-transactions" element={<FinancialTransactions />} />
      <Route path="/sales-management/contracts-and-agreements" element={<ContractsAndAgreements />} />
      <Route path="/sales-management/payments-and-receipts" element={<PaymentsAndReceipts />} />
      <Route path="/sales-management/transaction-status" element={<TransactionStatus />} />
      {/* Define other routes related to sales management as needed */}
    </Routes>
  );
}

export default SalesRoutes;
