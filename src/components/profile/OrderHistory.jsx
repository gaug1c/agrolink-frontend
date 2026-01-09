import React, { useState } from 'react';
import { Package, Truck, CheckCircle, XCircle, Eye, Download, RefreshCw } from 'lucide-react';
import Button from '../common/Button';
import Modal from '../common/Modal';

const OrderHistory = ({ orders = [] }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState('all');

  const statusConfig = {
    pending: {
      label: 'En attente',
      color: 'bg-yellow-100 text-yellow-800',
      icon: RefreshCw,
    },
    confirmed: {
      label: 'Confirmée',
      color: 'bg-blue-100 text-blue-800',
      icon: CheckCircle,
    },
    shipping: {
      label: 'En livraison',
      color: 'bg-purple-100 text-purple-800',
      icon: Truck,
    },
    delivered: {
      label: 'Livrée',
      color: 'bg-green-100 text-green-800',
      icon: CheckCircle,
    },
    cancelled: {
      label: 'Annulée',
      color: 'bg-red-100 text-red-800',
      icon: XCircle,
    },
  };

  const filters = [
    { id: 'all', label: 'Toutes' },
    { id: 'pending', label: 'En attente' },
    { id: 'shipping', label: 'En livraison' },
    { id: 'delivered', label: 'Livrées' },
    { id: 'cancelled', label: 'Annulées' },
  ];

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const OrderDetailModal = () => {
    if (!selectedOrder) return null;

    const StatusIcon = statusConfig[selectedOrder.status].icon;

    return (
      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={`Commande #${selectedOrder.orderNumber}`}
        size="2xl"
      >
        <div className="space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between">
            <div className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold
              ${statusConfig[selectedOrder.status].color}
            `}>
              <StatusIcon className="w-5 h-5" />
              {statusConfig[selectedOrder.status].label}
            </div>
            <span className="text-sm text-gray-600">{selectedOrder.date}</span>
          </div>

          {/* Items */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3">Articles commandés</h3>
            <div className="space-y-3">
              {selectedOrder.items.map((item, index) => (
                <div key={index} className="flex gap-4 bg-gray-50 rounded-lg p-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center text-3xl">
                    {item.image}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{item.title}</h4>
                    <p className="text-sm text-gray-600">Quantité: {item.quantity}</p>
                    <p className="font-bold text-green-600">
                      {(item.price * item.quantity).toLocaleString()} FCFA
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Info */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3">Adresse de livraison</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">
                {selectedOrder.shippingAddress.name}<br />
                {selectedOrder.shippingAddress.address}<br />
                {selectedOrder.shippingAddress.city}<br />
                {selectedOrder.shippingAddress.phone}
              </p>
            </div>
          </div>

          {/* Total */}
          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span className="text-green-600">
                {selectedOrder.total.toLocaleString()} FCFA
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button variant="outline" icon={<Download />}>
              Télécharger la facture
            </Button>
            {selectedOrder.status === 'delivered' && (
              <Button icon={<RefreshCw />}>
                Commander à nouveau
              </Button>
            )}
          </div>
        </div>
      </Modal>
    );
  };

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Package className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Aucune commande
        </h3>
        <p className="text-gray-600 mb-6">
          Vous n'avez pas encore passé de commande
        </p>
        <Button>
          Découvrir les produits
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Historique des commandes
      </h2>

      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {filters.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`
              px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition
              ${filter === f.id
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map(order => {
          const StatusIcon = statusConfig[order.status].icon;
          
          return (
            <div
              key={order.id}
              className="border-2 border-gray-200 rounded-xl p-4 hover:border-green-500 transition cursor-pointer"
              onClick={() => setSelectedOrder(order)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">
                    Commande #{order.orderNumber}
                  </h3>
                  <p className="text-sm text-gray-600">{order.date}</p>
                </div>
                <div className={`
                  inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold
                  ${statusConfig[order.status].color}
                `}>
                  <StatusIcon className="w-4 h-4" />
                  {statusConfig[order.status].label}
                </div>
              </div>

              <div className="flex items-center gap-4 mb-4">
                {order.items.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center text-2xl">
                    {item.image}
                  </div>
                ))}
                {order.items.length > 3 && (
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm text-gray-600 font-semibold">
                      +{order.items.length - 3}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">
                  {order.itemsCount} article{order.itemsCount > 1 ? 's' : ''}
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold text-green-600">
                    {order.total.toLocaleString()} FCFA
                  </span>
                  <Button size="sm" variant="outline" icon={<Eye />}>
                    Voir
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <OrderDetailModal />
    </div>
  );
};

export default OrderHistory;