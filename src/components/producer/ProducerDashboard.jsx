import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Store, 
  Package, 
  ShoppingBag, 
  TrendingUp, 
  MapPin, 
  MessageSquare, 
  Bell,
  Plus,
  Eye,
  Edit,
  Trash2,
  Check,
  X,
  Clock,
  DollarSign,
  Users,
  Calendar
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const ProducerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // États
  const [stats, setStats] = useState({
    productsOnline: 0,
    pendingOrders: 0,
    totalRevenue: 0,
    completedOrders: 0
  });
  
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simuler le chargement des données (à remplacer par vos appels API)
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // TODO: Remplacer par vos appels API réels
      // const data = await getDashboardStats();
      
      // Données simulées pour la démonstration
      setStats({
        productsOnline: 12,
        pendingOrders: 5,
        totalRevenue: 245000,
        completedOrders: 28
      });

      setRecentOrders([
        {
          id: 1,
          customer: 'Jean Mbadinga',
          product: 'Banane Plantain',
          quantity: '50 kg',
          price: 25000,
          status: 'pending',
          date: '2024-01-15'
        },
        {
          id: 2,
          customer: 'Marie Koumba',
          product: 'Manioc',
          quantity: '100 kg',
          price: 15000,
          status: 'accepted',
          date: '2024-01-14'
        },
        {
          id: 3,
          customer: 'Paul Nguema',
          product: 'Tomates',
          quantity: '20 kg',
          price: 12000,
          status: 'completed',
          date: '2024-01-13'
        }
      ]);

      setRecentProducts([
        {
          id: 1,
          name: 'Banane Plantain',
          quantity: 150,
          unit: 'kg',
          price: 500,
          status: 'available',
          image: null
        },
        {
          id: 2,
          name: 'Manioc',
          quantity: 200,
          unit: 'kg',
          price: 150,
          status: 'available',
          image: null
        },
        {
          id: 3,
          name: 'Tomates',
          quantity: 5,
          unit: 'kg',
          price: 600,
          status: 'low-stock',
          image: null
        }
      ]);

      setNotifications([
        {
          id: 1,
          type: 'order',
          message: 'Nouvelle commande de Jean Mbadinga',
          time: 'Il y a 5 min',
          read: false
        },
        {
          id: 2,
          type: 'message',
          message: 'Nouveau message de Marie Koumba',
          time: 'Il y a 1h',
          read: false
        },
        {
          id: 3,
          type: 'info',
          message: 'Votre stock de tomates est faible',
          time: 'Il y a 2h',
          read: true
        }
      ]);

    } catch (error) {
      console.error('Erreur chargement dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getOrderStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'En attente', icon: Clock },
      accepted: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Acceptée', icon: Check },
      completed: { bg: 'bg-green-100', text: 'text-green-800', label: 'Terminée', icon: Check },
      rejected: { bg: 'bg-red-100', text: 'text-red-800', label: 'Refusée', icon: X }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  const getProductStatusBadge = (status) => {
    const statusConfig = {
      available: { bg: 'bg-green-100', text: 'text-green-800', label: 'Disponible' },
      'low-stock': { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Stock faible' },
      'out-of-stock': { bg: 'bg-red-100', text: 'text-red-800', label: 'Rupture' }
    };
    
    const config = statusConfig[status] || statusConfig.available;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement du dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header du Dashboard */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Tableau de bord Producteur
              </h1>
              <p className="text-gray-600 mt-1">
                Bienvenue, {user?.nomResponsable || user?.firstName}
              </p>
            </div>
            <button
              onClick={() => navigate('/producer/produits/ajouter')}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <Plus className="w-5 h-5 mr-2" />
              Ajouter un produit
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Produits en ligne */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Produits en ligne</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.productsOnline}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <button 
              onClick={() => navigate('/producer/produits')}
              className="text-blue-600 text-sm font-medium mt-4 hover:underline"
            >
              Voir tous les produits →
            </button>
          </div>

          {/* Commandes en attente */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Commandes reçues</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.pendingOrders}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <ShoppingBag className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <button 
              onClick={() => navigate('/producer/commandes')}
              className="text-yellow-600 text-sm font-medium mt-4 hover:underline"
            >
              Voir les commandes →
            </button>
          </div>

          {/* Revenus totaux */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Revenus totaux</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.totalRevenue.toLocaleString()} FCFA
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <button 
              onClick={() => navigate('/producer/historique')}
              className="text-green-600 text-sm font-medium mt-4 hover:underline"
            >
              Voir l'historique →
            </button>
          </div>

          {/* Ventes terminées */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Ventes terminées</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.completedOrders}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-4">Ce mois-ci</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne principale (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Commandes récentes */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">Commandes récentes</h2>
                  <button 
                    onClick={() => navigate('/producer/commandes')}
                    className="text-green-600 text-sm font-medium hover:underline"
                  >
                    Voir tout
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <div key={order.id} className="p-6 hover:bg-gray-50 transition">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">{order.customer}</h3>
                            {getOrderStatusBadge(order.status)}
                          </div>
                          <p className="text-gray-600 text-sm mb-1">
                            <strong>{order.product}</strong> - {order.quantity}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(order.date).toLocaleDateString('fr-FR')}
                            </span>
                            <span className="flex items-center font-semibold text-green-600">
                              <DollarSign className="w-4 h-4 mr-1" />
                              {order.price.toLocaleString()} FCFA
                            </span>
                          </div>
                        </div>
                        {order.status === 'pending' && (
                          <div className="flex gap-2 ml-4">
                            <button className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition">
                              <Check className="w-4 h-4" />
                            </button>
                            <button className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center text-gray-500">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Aucune commande récente</p>
                  </div>
                )}
              </div>
            </div>

            {/* Produits récents */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">Mes produits</h2>
                  <button 
                    onClick={() => navigate('/producer/produits')}
                    className="text-green-600 text-sm font-medium hover:underline"
                  >
                    Gérer tous
                  </button>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {recentProducts.length > 0 ? (
                  recentProducts.map((product) => (
                    <div key={product.id} className="p-6 hover:bg-gray-50 transition">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center">
                            <Package className="w-8 h-8 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{product.name}</h3>
                            <p className="text-gray-600 text-sm">
                              Stock: {product.quantity} {product.unit}
                            </p>
                            <p className="text-green-600 font-semibold text-sm mt-1">
                              {product.price} FCFA/{product.unit}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getProductStatusBadge(product.status)}
                          <div className="flex gap-2">
                            <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center text-gray-500">
                    <Package className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Aucun produit ajouté</p>
                    <button
                      onClick={() => navigate('/producer/produits/ajouter')}
                      className="mt-4 text-green-600 font-medium hover:underline"
                    >
                      Ajouter votre premier produit
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Colonne latérale (1/3) */}
          <div className="space-y-6">
            {/* Localisation */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Ma localisation</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Province</p>
                  <p className="font-semibold text-gray-900 capitalize">
                    {user?.province || 'Non spécifiée'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Ville/Village</p>
                  <p className="font-semibold text-gray-900">
                    {user?.villeProduction || user?.villageProduction || 'Non spécifié'}
                  </p>
                </div>
                <button className="w-full mt-4 px-4 py-2 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition font-medium">
                  Modifier ma localisation
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Bell className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {notifications.filter(n => !n.read).length}
                    </span>
                  )}
                </div>
              </div>
              <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 hover:bg-gray-50 transition cursor-pointer ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${
                          notification.type === 'order' ? 'bg-green-100' :
                          notification.type === 'message' ? 'bg-blue-100' :
                          'bg-gray-100'
                        }`}>
                          {notification.type === 'order' && <ShoppingBag className="w-4 h-4 text-green-600" />}
                          {notification.type === 'message' && <MessageSquare className="w-4 h-4 text-blue-600" />}
                          {notification.type === 'info' && <Bell className="w-4 h-4 text-gray-600" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900 font-medium">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p className="text-sm">Aucune notification</p>
                  </div>
                )}
              </div>
              <div className="p-4 border-t border-gray-200">
                <button className="w-full text-center text-sm text-green-600 font-medium hover:underline">
                  Voir toutes les notifications
                </button>
              </div>
            </div>

            {/* Messagerie rapide */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Messages</h2>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Vous avez 3 nouveaux messages
              </p>
              <button 
                onClick={() => navigate('/producer/messages')}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition font-medium"
              >
                Voir les messages
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProducerDashboard;