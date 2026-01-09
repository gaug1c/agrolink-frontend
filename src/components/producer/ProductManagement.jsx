import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Package, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2,
  ChevronLeft,
  Grid,
  List
} from 'lucide-react';

const ProductManagement = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'available', 'low-stock', 'out-of-stock'

  // Données simulées (à remplacer par vos appels API)
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Banane Plantain',
      category: 'Fruits',
      quantity: 150,
      unit: 'kg',
      price: 500,
      disponibilite: 'Toute l\'année',
      status: 'available',
      image: null,
      createdAt: '2024-01-10'
    },
    {
      id: 2,
      name: 'Manioc',
      category: 'Tubercules',
      quantity: 200,
      unit: 'kg',
      price: 150,
      disponibilite: 'Septembre - Décembre',
      status: 'available',
      image: null,
      createdAt: '2024-01-08'
    },
    {
      id: 3,
      name: 'Tomates',
      category: 'Légumes',
      quantity: 5,
      unit: 'kg',
      price: 600,
      disponibilite: 'Janvier - Avril',
      status: 'low-stock',
      image: null,
      createdAt: '2024-01-05'
    },
    {
      id: 4,
      name: 'Aubergine',
      category: 'Légumes',
      quantity: 0,
      unit: 'kg',
      price: 400,
      disponibilite: 'Mars - Juin',
      status: 'out-of-stock',
      image: null,
      createdAt: '2024-01-03'
    }
  ]);

  const getStatusBadge = (status) => {
    const statusConfig = {
      available: { bg: 'bg-green-100', text: 'text-green-800', label: 'Disponible' },
      'low-stock': { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Stock faible' },
      'out-of-stock': { bg: 'bg-red-100', text: 'text-red-800', label: 'Rupture de stock' }
    };
    const config = statusConfig[status] || statusConfig.available;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setProducts(products.filter(p => p.id !== productId));
      // TODO: Appel API pour supprimer le produit
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
      {/* Image du produit */}
      <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <Package className="w-16 h-16 text-green-600" />
        )}
      </div>
      
      {/* Informations du produit */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>
          {getStatusBadge(product.status)}
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Stock:</span>
            <span className="font-semibold text-gray-900">{product.quantity} {product.unit}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Prix:</span>
            <span className="font-semibold text-green-600">{product.price} FCFA/{product.unit}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Disponibilité:</span>
            <span className="text-gray-900 text-xs">{product.disponibilite}</span>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 pt-3 border-t border-gray-200">
          <button 
            onClick={() => navigate(`/producteur/produits/${product.id}`)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            <Eye className="w-4 h-4" />
            Voir
          </button>
          <button 
            onClick={() => navigate(`/producteur/produits/${product.id}/modifier`)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200 transition"
          >
            <Edit className="w-4 h-4" />
            Modifier
          </button>
          <button 
            onClick={() => handleDeleteProduct(product.id)}
            className="px-3 py-2 text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const ProductRow = ({ product }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
      <div className="flex items-center gap-4">
        {/* Image */}
        <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center flex-shrink-0">
          {product.image ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
          ) : (
            <Package className="w-8 h-8 text-green-600" />
          )}
        </div>
        
        {/* Informations */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <p className="font-semibold text-gray-900">{product.name}</p>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Stock</p>
            <p className="font-semibold text-gray-900">{product.quantity} {product.unit}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Prix</p>
            <p className="font-semibold text-green-600">{product.price} FCFA</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Disponibilité</p>
            <p className="text-sm text-gray-900">{product.disponibilite}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Statut</p>
            {getStatusBadge(product.status)}
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex gap-2 flex-shrink-0">
          <button 
            onClick={() => navigate(`/producteur/produits/${product.id}`)}
            className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button 
            onClick={() => navigate(`/producteur/produits/${product.id}/modifier`)}
            className="p-2 text-blue-700 hover:bg-blue-100 rounded-lg transition"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button 
            onClick={() => handleDeleteProduct(product.id)}
            className="p-2 text-red-700 hover:bg-red-100 rounded-lg transition"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

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
                <h1 className="text-2xl font-bold text-gray-900">Gestion des produits</h1>
                <p className="text-gray-600 mt-1">{products.length} produit(s) au total</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/producteur/produits/ajouter')}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <Plus className="w-5 h-5 mr-2" />
              Ajouter un produit
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtres et recherche */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Recherche */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filtre par statut */}
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">Tous les statuts</option>
                <option value="available">Disponible</option>
                <option value="low-stock">Stock faible</option>
                <option value="out-of-stock">Rupture de stock</option>
              </select>
            </div>

            {/* Toggle vue */}
            <div className="flex gap-2 border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Liste des produits */}
        {filteredProducts.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map(product => (
                <ProductRow key={product.id} product={product} />
              ))}
            </div>
          )
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Aucun produit trouvé</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || filterStatus !== 'all' 
                ? 'Essayez de modifier vos critères de recherche' 
                : 'Commencez par ajouter votre premier produit'}
            </p>
            <button
              onClick={() => navigate('/producteur/produits/ajouter')}
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <Plus className="w-5 h-5 mr-2" />
              Ajouter un produit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;