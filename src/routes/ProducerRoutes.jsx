import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import ProducerDashboard from '../components/producer/ProducerDashboard';
import ProductManagement from '../components/producer/ProductManagement';
import AddEditProduct from '../components/producer/AddEditProduct';
import OrderManagement from '../components/producer/OrderManagement';
import SalesHistory from '../components/producer/SalesHistory';

const ProducerRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        {/* Dashboard principal */}
        <Route path="dashboard" element={<ProducerDashboard />} />
        
        {/* Gestion des produits */}
        <Route path="produits" element={<ProductManagement />} />
        <Route path="produits/ajouter" element={<AddEditProduct />} />
        <Route path="produits/:productId/modifier" element={<AddEditProduct />} />
        
        {/* Gestion des commandes */}
        <Route path="commandes" element={<OrderManagement />} />
        
        {/* Historique des ventes */}
        <Route path="historique" element={<SalesHistory />} />
        
        {/* Messagerie */}
        <Route path="messages" element={<MessagesPage />} />
        <Route path="messages/:customerId" element={<ChatPage />} />
        
        {/* Notifications */}
        <Route path="notifications" element={<NotificationsPage />} />
        
        {/* Paramètres producteur */}
        <Route path="parametres" element={<ProducerSettings />} />
        
        {/* Clients */}
        <Route path="clients" element={<ClientsPage />} />
        
        {/* Redirection par défaut */}
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </DashboardLayout>
  );
};

// Composants temporaires pour les routes non implémentées
const MessagesPage = () => (
  <div className="p-6">
    <div className="bg-white rounded-lg shadow p-8 text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Messagerie</h1>
      <p className="text-gray-600">Cette page sera bientôt disponible</p>
    </div>
  </div>
);

const ChatPage = () => (
  <div className="p-6">
    <div className="bg-white rounded-lg shadow p-8 text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Conversation</h1>
      <p className="text-gray-600">Cette page sera bientôt disponible</p>
    </div>
  </div>
);

const NotificationsPage = () => (
  <div className="p-6">
    <div className="bg-white rounded-lg shadow p-8 text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Notifications</h1>
      <p className="text-gray-600">Cette page sera bientôt disponible</p>
    </div>
  </div>
);

const ProducerSettings = () => (
  <div className="p-6">
    <div className="bg-white rounded-lg shadow p-8 text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Paramètres</h1>
      <p className="text-gray-600">Cette page sera bientôt disponible</p>
    </div>
  </div>
);

const ClientsPage = () => (
  <div className="p-6">
    <div className="bg-white rounded-lg shadow p-8 text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Clients</h1>
      <p className="text-gray-600">Cette page sera bientôt disponible</p>
    </div>
  </div>
);

export default ProducerRoutes;