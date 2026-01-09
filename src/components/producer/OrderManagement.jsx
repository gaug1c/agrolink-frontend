import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  ChevronLeft, 
  Check, 
  X, 
  Clock, 
  Eye,
  Calendar,
  User,
  Phone,
  MapPin,
  DollarSign,
  Package,
  MessageSquare,
  Filter
} from 'lucide-react';

const OrderManagement = () => {
  const navigate = useNavigate();
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Données simulées (à remplacer par vos appels API)
  const [orders, setOrders] = useState([
    {
      id: 1,
      orderId: 'CMD-2024-001',
      customer: {
        name: 'Jean Mbadinga',
        phone: '+241 XX XX XX XX',
        location: 'Libreville, Estuaire'
      },
      products: [
        { name: 'Banane Plantain', quantity: 50, unit: 'kg', price: 500 }
      ],
      totalAmount: 25000,
      status: 'pending',
      date: '2024-01-15T10:30:00',
      deliveryDate: '2024-01-18',
      message: 'Besoin de la livraison avant 14h'
    },
    {
      id: 2,
      orderId: 'CMD-2024-002',
      customer: {
        name: 'Marie Koumba',
        phone: '+241 YY YY YY YY',
        location: 'Port-Gentil, Ogooué-Maritime'
      },
      products: [
        { name: 'Manioc', quantity: 100, unit: 'kg', price: 150 },
        { name: 'Tomates', quantity: 10, unit: 'kg', price: 600 }
      ],
      totalAmount: 21000,
      status: 'accepted',
      date: '2024-01-14T14:20:00',
      deliveryDate: '2024-01-16',
      message: ''
    },
    {
      id: 3,
      orderId: 'CMD-2024-003',
      customer: {
        name: 'Paul Nguema',
        phone: '+241 ZZ ZZ ZZ ZZ',
        location: 'Franceville, Haut-Ogooué'
      },
      products: [
        { name: 'Tomates', quantity: 20, unit: 'kg', price: 600 }
      ],
      totalAmount: 12000,
      status: 'completed',
      date: '2024-01-13T09:15:00',
      deliveryDate: '2024-01-15',
      message: ''
    },
    {
      id: 4,
      orderId: 'CMD-2024-004',
      customer: {
        name: 'Sophie Obiang',
        phone: '+241 AA AA AA AA',
        location: 'Oyem, Woleu-Ntem'
      },
      products: [
        { name: 'Aubergine', quantity: 30, unit: 'kg', price: 400 }
      ],
      totalAmount: 12000,
      status: 'rejected',
      date: '2024-01-12T16:45:00',
      deliveryDate: '2024-01-14',
      message: 'Livraison urgente'
    }
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const getStatusConfig = (status) => {
    const configs = {
      pending: { 
        bg: 'bg-yellow-100', 
        text: 'text-yellow-800', 
        label: 'En attente', 
        icon: Clock,
        dot: 'bg-yellow-500'
      },
      accepted: { 
        bg: 'bg-blue-100', 
        text: 'text-blue-800', 
        label: 'Acceptée', 
        icon: Check,
        dot: 'bg-blue-500'
      },
      completed: { 
        bg: 'bg-green-100', 
        text: 'text-green-800', 
        label: 'Terminée', 
        icon: Check,
        dot: 'bg-green-500'
      },
      rejected: { 
        bg: 'bg-red-100', 
        text: 'text-red-800', 
        label: 'Refusée', 
        icon: X,
        dot: 'bg-red-500'
      }
    };
    return configs[status] || configs.pending;
  };

  const handleAcceptOrder = (orderId) => {
    if (window.confirm('Accepter cette commande ?')) {
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: 'accepted' } : order
      ));
      // TODO: Appel API
    }
  };

  const handleRejectOrder = (orderId) => {
    if (window.confirm('Refuser cette commande ?')) {
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: 'rejected' } : order
      ));
      // TODO: Appel API
    }
  };

  const handleCompleteOrder = (orderId) => {
    if (window.confirm('Marquer cette commande comme terminée ?')) {
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: 'completed' } : order
      ));
      // TODO: Appel API
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowDetailModal(true);
  };

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === filterStatus);

  const stats = {
    pending: orders.filter(o => o.status === 'pending').length,
    accepted: orders.filter(o => o.status === 'accepted').length,
    completed: orders.filter(o => o.status === 'completed').length,
    rejected: orders.filter(o => o.status === 'rejected').length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/producteur/dashboard')}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gestion des commandes</h1>
                <p className="text-gray-600 mt-1">{orders.length} commande(s) au total</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques rapides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-800 text-sm font-medium">En attente</p>
                <p className="text-2xl font-bold text-yellow-900 mt-1">{stats.pending}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-800 text-sm font-medium">Acceptées</p>
                <p className="text-2xl font-bold text-blue-900 mt-1">{stats.accepted}</p>
              </div>
              <Check className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-800 text-sm font-medium">Terminées</p>
                <p className="text-2xl font-bold text-green-900 mt-1">{stats.completed}</p>
              </div>
              <Check className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-800 text-sm font-medium">Refusées</p>
                <p className="text-2xl font-bold text-red-900 mt-1">{stats.rejected}</p>
              </div>
              <X className="w-8 h-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Filtre */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="all">Toutes les commandes</option>
              <option value="pending">En attente</option>
              <option value="accepted">Acceptées</option>
              <option value="completed">Terminées</option>
              <option value="rejected">Refusées</option>
            </select>
          </div>
        </div>

        {/* Liste des commandes */}
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => {
              const statusConfig = getStatusConfig(order.status);
              const StatusIcon = statusConfig.icon;
              
              return (
                <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <ShoppingBag className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-gray-900">{order.orderId}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusConfig.label}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p className="flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            <strong className="text-gray-900">{order.customer.name}</strong>
                          </p>
                          <p className="flex items-center">
                            <Phone className="w-4 h-4 mr-2" />
                            {order.customer.phone}
                          </p>
                          <p className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {order.customer.location}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-sm text-gray-600">Montant total</p>
                      <p className="text-2xl font-bold text-green-600">
                        {order.totalAmount.toLocaleString()} FCFA
                      </p>
                    </div>
                  </div>

                  {/* Produits commandés */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Produits commandés:</p>
                    <div className="space-y-2">
                      {order.products.map((product, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900 font-medium">{product.name}</span>
                            <span className="text-gray-600">× {product.quantity} {product.unit}</span>
                          </div>
                          <span className="text-gray-900 font-semibold">
                            {(product.quantity * product.price).toLocaleString()} FCFA
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Commande: {new Date(order.date).toLocaleDateString('fr-FR')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>Livraison: {new Date(order.deliveryDate).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>

                  {/* Message du client */}
                  {order.message && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                      <div className="flex items-start gap-2">
                        <MessageSquare className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-blue-900 mb-1">Message du client:</p>
                          <p className="text-sm text-blue-800">{order.message}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleViewDetails(order)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                    >
                      <Eye className="w-4 h-4" />
                      Détails
                    </button>

                    {order.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleAcceptOrder(order.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                        >
                          <Check className="w-4 h-4" />
                          Accepter
                        </button>
                        <button
                          onClick={() => handleRejectOrder(order.id)}
                          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                        >
                          <X className="w-4 h-4" />
                          Refuser
                        </button>
                      </>
                    )}

                    {order.status === 'accepted' && (
                      <button
                        onClick={() => handleCompleteOrder(order.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                      >
                        <Check className="w-4 h-4" />
                        Marquer comme terminée
                      </button>
                    )}

                    <button
                      onClick={() => navigate(`/producteur/messages/${order.customer.name}`)}
                      className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucune commande</h3>
              <p className="text-gray-600">
                {filterStatus === 'all' 
                  ? 'Vous n\'avez reçu aucune commande pour le moment' 
                  : `Aucune commande avec le statut "${getStatusConfig(filterStatus).label}"`}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal détails (optionnel - vous pouvez l'améliorer) */}
      {showDetailModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Détails de la commande</h2>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-6">
              {/* Contenu détaillé de la commande */}
              <p className="text-gray-600">Détails complets de la commande {selectedOrder.orderId}</p>
              {/* Ajoutez plus de détails selon vos besoins */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;