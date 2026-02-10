import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import ProductCard from '../components/products/ProductCard';
import { productService } from '../services/api/productService';
import { categoryService } from '../services/api/categoryService';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, sortBy]);

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error('Erreur lors du chargement des catégories:', error);
    }
  };

  const fetchProducts = async () => {
  try {
    setLoading(true);
    let response;
    
    if (selectedCategory) {
      response = await productService.getProductsByCategory(selectedCategory, {
        sort: sortBy,
      });
    } else {
      response = await productService.getAllProducts({
        sort: sortBy,
      });
    }
    
    // Assure-toi que c'est un tableau
    const data = Array.isArray(response) ? response : (response.data || []);
    setProducts(data);
  } catch (error) {
    console.error('Erreur lors du chargement des produits:', error);
    setProducts([]); // Important : initialise avec un tableau vide en cas d'erreur
  } finally {
    setLoading(false);
  }
};

  // Filtrer les produits par terme de recherche
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Nos Produits
          </h1>
          <p className="text-gray-600">
            Découvrez notre sélection de produits frais et locaux
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="newest">Plus récents</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="popular">Plus populaires</option>
              <option value="name">Nom (A-Z)</option>
            </select>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <SlidersHorizontal className="h-5 w-5" />
              <span>Filtres</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Catégories
              </h3>
              <div className="space-y-2">
                {/* All products button */}
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    selectedCategory === null
                      ? 'bg-green-600 text-white'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  Tous les produits
                </button>

                {/* Category buttons */}
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition ${
                      selectedCategory === category.id
                        ? 'bg-green-600 text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                    <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                    <div className="bg-gray-200 h-4 rounded mb-2"></div>
                    <div className="bg-gray-200 h-4 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
                <div className="mb-4 text-gray-600">
                  {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-gray-500 text-lg mb-2">Aucun produit trouvé</p>
                <p className="text-gray-400 text-sm">
                  Essayez de modifier vos critères de recherche
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;