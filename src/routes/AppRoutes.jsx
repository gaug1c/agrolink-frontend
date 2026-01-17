import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Pages publiques
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import ProducersPage from '../pages/ProducersPage';
import ProducerDetailPage from '../pages/ProducerDetailPage';
import AboutPage from '../pages/AboutPage';
import ContactPage from '../pages/ContactPage';
import NotFoundPage from '../pages/NotFoundPage';

// Pages consommateur (protégées)
import ProfilePage from '../pages/ProfilePage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';

// Composants producteur
import ProducerDashboard from '../components/producer/ProducerDashboard';
import ProductManagement from '../components/producer/ProductManagement';
import AddEditProduct from '../components/producer/AddEditProduct';
import OrderManagement from '../components/producer/OrderManagement';
import SalesHistory from '../components/producer/SalesHistory';

// Composant de route protégée
const PrivateRoute = ({ children, allowedUserTypes = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/connexion" replace />;
  }

  // Si des types d'utilisateurs sont spécifiés, vérifier
  if (allowedUserTypes.length > 0 && !allowedUserTypes.includes(user.userType)) {
    // Rediriger vers la page appropriée selon le type d'utilisateur
    if (user.userType === 'producteur' || user.userType === 'producer') {
      return <Navigate to="/producteur/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

// Routes producteur
const ProducerRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<ProducerDashboard />} />
      <Route path="produits" element={<ProductManagement />} />
      <Route path="produits/ajouter" element={<AddEditProduct />} />
      <Route path="produits/:productId/modifier" element={<AddEditProduct />} />
      <Route path="commandes" element={<OrderManagement />} />
      <Route path="historique" element={<SalesHistory />} />
      
      {/* Routes à implémenter */}
      <Route path="messages" element={<ComingSoonPage title="Messagerie" />} />
      <Route path="notifications" element={<ComingSoonPage title="Notifications" />} />
      <Route path="parametres" element={<ComingSoonPage title="Paramètres" />} />
      
      {/* Redirection par défaut */}
      <Route path="*" element={<Navigate to="/producteur/dashboard" replace />} />
    </Routes>
  );
};

// Page "Bientôt disponible"
const ComingSoonPage = ({ title }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">{title}</h1>
      <p className="text-gray-600">Cette page sera bientôt disponible</p>
    </div>
  </div>
);

// Routes principales
const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes publiques avec MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/produits" element={<ProductsPage />} />
        <Route path="/produits/:id" element={<ProductDetailPage />} />
        <Route path="/producers" element={<ProducersPage />} />
        <Route path="/producers/:id" element={<ProducerDetailPage />} />
        <Route path="/a-propos" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>

      {/* Routes d'authentification avec AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route path="/connexion" element={<LoginPage />} />
        <Route path="/inscription" element={<RegisterPage />} />
      </Route>

      {/* Routes consommateur protégées */}
      <Route element={<MainLayout />}>
        <Route
          path="/profil"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/panier"
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/commander"
          element={
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          }
        />
      </Route>

      {/* Routes producteur protégées */}
      <Route
        path="/producteur/*"
        element={
          <PrivateRoute allowedUserTypes={['producteur', 'producer']}>
            <ProducerRoutes />
          </PrivateRoute>
        }
      />

      {/* Route 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;