import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProducerDashboard from '../components/producer/ProducerDashboard';
import ProductManagement from '../components/producer/ProductManagement';
import AddEditProduct from '../components/producer/AddEditProduct';
import OrderManagement from '../components/producer/OrderManagement';
import SalesHistory from '../components/producer/SalesHistory';
import { useAuth } from '../hooks/useAuth';

const ProducerRoutes = () => {
  const { user } = useAuth();

  // Vérifier si l'utilisateur est un producteur
  const isProducer = user?.userType === 'producteur' || user?.userType === 'producer';

  // Rediriger si ce n'est pas un producteur
  if (!isProducer) {
    return <Navigate to="/" replace />;
  }

  return (
    <Routes>
      {/* Dashboard principal */}
      <Route path="dashboard" element={<ProducerDashboard />} />
      
      {/* Gestion des produits */}
      <Route path="produits" element={<ProductManagement />} />
      <Route path="produits/ajouter" element={<AddEditProduct />} />
      <Route path="produits/:productId" element={<ProductDetailPage />} />
      <Route path="produits/:productId/modifier" element={<AddEditProduct />} />
      
      {/* Gestion des commandes */}
      <Route path="commandes" element={<OrderManagement />} />
      
      {/* Historique des ventes */}
      <Route path="historique" element={<SalesHistory />} />
      
      {/* Messagerie (à implémenter) */}
      <Route path="messages" element={<MessagesPage />} />
      <Route path="messages/:customerId" element={<ChatPage />} />
      
      {/* Notifications (à implémenter) */}
      <Route path="notifications" element={<NotificationsPage />} />
      
      {/* Paramètres producteur (à implémenter) */}
      <Route path="parametres" element={<ProducerSettings />} />
      
      {/* Redirection par défaut */}
      <Route path="*" element={<Navigate to="/producer/dashboard" replace />} />
    </Routes>
  );
};

// Composants temporaires pour les routes non implémentées
const ProductDetailPage = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Détails du produit</h1>
      <p className="text-gray-600">Cette page sera bientôt disponible</p>
    </div>
  </div>
);

const MessagesPage = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Messagerie</h1>
      <p className="text-gray-600">Cette page sera bientôt disponible</p>
    </div>
  </div>
);

const ChatPage = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Conversation</h1>
      <p className="text-gray-600">Cette page sera bientôt disponible</p>
    </div>
  </div>
);

const NotificationsPage = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Notifications</h1>
      <p className="text-gray-600">Cette page sera bientôt disponible</p>
    </div>
  </div>
);

const ProducerSettings = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Paramètres</h1>
      <p className="text-gray-600">Cette page sera bientôt disponible</p>
    </div>
  </div>
);

export default ProducerRoutes;