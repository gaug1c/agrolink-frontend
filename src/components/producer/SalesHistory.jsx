import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  ChevronLeft, 
  DollarSign,
  Calendar,
  Download,
  Filter,
  Package,
  ShoppingBag,
  Users,
  BarChart3
} from 'lucide-react';

const SalesHistory = () => {
  const navigate = useNavigate();
  const [periodFilter, setPeriodFilter] = useState('month'); // 'week', 'month', 'year', 'all'
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  // Données simulées (à remplacer par vos appels API)
  const salesData = {
    summary: {
      totalRevenue: 245000,
      totalOrders: 28,
      avgOrderValue: 8750,
      topProduct: 'Banane Plantain'
    },
    monthlySales: [
      { month: 'Janvier', revenue: 245000, orders: 28 },
      { month: 'Décembre', revenue: 189000, orders: 21 },
      { month: 'Novembre', revenue: 156000, orders: 18 }
    ],
    recentSales: [
      {
        id: 1,
        orderId: 'CMD-2024-003',
        date: '2024-01-15',
        customer: 'Paul Nguema',
        products: 'Tomates (20 kg)',
        amount: 12000,
        paymentStatus: 'paid'
      },
      {
        id: 2,
        orderId: 'CMD-2024-002',
        date: '2024-01-14',
        customer: 'Marie Koumba',
        products: 'Manioc (100 kg), Tomates (10 kg)',
        amount: 21000,
        paymentStatus: 'paid'
      },
      {
        id: 3,
        orderId: 'CMD-2024-001',
        date: '2024-01-13',
        customer: 'Jean Mbadinga',
        products: 'Banane Plantain (50 kg)',
        amount: 25000,
        paymentStatus: 'paid'
      },
      {
        id: 4,
        orderId: 'CMD-2023-125',
        date: '2024-01-12',
        customer: 'Sophie Obiang',
        products: 'Aubergine (30 kg)',
        amount: 12000,
        paymentStatus: 'pending'
      },
      {
        id: 5,
        orderId: 'CMD-2023-124',
        date: '2024-01-11',
        customer: 'Pierre Ekomi',
        products: 'Manioc (80 kg)',
        amount: 12000,
        paymentStatus: 'paid'
      }
    ],
    topProducts: [
      { name: 'Banane Plantain', quantity: 450, unit: 'kg', revenue: 225000, percentage: 40 },
      { name: 'Manioc', quantity: 680, unit: 'kg', revenue: 102000, percentage: 30 },
      { name: 'Tomates', quantity: 150, unit: 'kg', revenue: 90000, percentage: 20 },
      { name: 'Aubergine', quantity: 120, unit: 'kg', revenue: 48000, percentage: 10 }
    ]
  };

  const handleExportData = () => {
    // TODO: Implémenter l'export des données (CSV, PDF, etc.)
    alert('Export des données en cours...');
  };

  const getPaymentStatusBadge = (status) => {
    if (status === 'paid') {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Payé
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        En attente
      </span>
    );
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
                <h1 className="text-2xl font-bold text-gray-900">Historique des ventes</h1>
                <p className="text-gray-600 mt-1">Analysez vos performances de vente</p>
              </div>
            </div>
            <button
              onClick={handleExportData}
              className="inline-flex items-center px-4 py-2 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition"
            >
              <Download className="w-5 h-5 mr-2" />
              Exporter les données
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques globales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <p className="text-sm text-gray-600 mb-1">Revenu total</p>
            <p className="text-2xl font-bold text-gray-900">
              {salesData.summary.totalRevenue.toLocaleString()} FCFA
            </p>
            <p className="text-sm text-green-600 mt-2">+12% ce mois</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Commandes terminées</p>
            <p className="text-2xl font-bold text-gray-900">{salesData.summary.totalOrders}</p>
            <p className="text-sm text-blue-600 mt-2">Ce mois-ci</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Panier moyen</p>
            <p className="text-2xl font-bold text-gray-900">
              {salesData.summary.avgOrderValue.toLocaleString()} FCFA
            </p>
            <p className="text-sm text-purple-600 mt-2">Par commande</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-1">Produit vedette</p>
            <p className="text-lg font-bold text-gray-900">{salesData.summary.topProduct}</p>
            <p className="text-sm text-orange-600 mt-2">Le plus vendu</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Ventes mensuelles */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Évolution des ventes</h2>
              <select
                value={periodFilter}
                onChange={(e) => setPeriodFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              >
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
                <option value="year">Cette année</option>
                <option value="all">Tout</option>
              </select>
            </div>

            {/* Graphique simplifié */}
            <div className="space-y-4">
              {salesData.monthlySales.map((item, index) => {
                const maxRevenue = Math.max(...salesData.monthlySales.map(s => s.revenue));
                const percentage = (item.revenue / maxRevenue) * 100;
                
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{item.month}</span>
                      <span className="text-sm text-gray-600">{item.orders} commandes</span>
                    </div>
                    <div className="relative">
                      <div className="h-8 bg-gray-200 rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-end px-3 transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        >
                          <span className="text-white text-sm font-semibold">
                            {item.revenue.toLocaleString()} FCFA
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Produits les plus vendus */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-green-100 p-2 rounded-lg">
                <BarChart3 className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Top produits</h2>
            </div>

            <div className="space-y-4">
              {salesData.topProducts.map((product, index) => (
                <div key={index} className="pb-4 border-b border-gray-200 last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-600">{product.quantity} {product.unit} vendus</p>
                    </div>
                    <span className="text-sm font-bold text-green-600">
                      {product.percentage}%
                    </span>
                  </div>
                  <div className="relative">
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-600 rounded-full transition-all duration-500"
                        style={{ width: `${product.percentage}%` }}
                      />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {product.revenue.toLocaleString()} FCFA
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filtre par période */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de début
                </label>
                <input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date de fin
                </label>
                <input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-end">
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                  Appliquer le filtre
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Historique détaillé */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Historique détaillé des ventes</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Commande
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produits
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Montant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Paiement
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {salesData.recentSales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{sale.orderId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(sale.date).toLocaleDateString('fr-FR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{sale.customer}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-xs truncate">{sale.products}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-green-600">
                        {sale.amount.toLocaleString()} FCFA
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPaymentStatusBadge(sale.paymentStatus)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Affichage de 1 à {salesData.recentSales.length} sur {salesData.summary.totalOrders} ventes
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition">
                Précédent
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition">
                Suivant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesHistory;