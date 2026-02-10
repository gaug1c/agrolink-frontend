import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Package, Star, Search, SlidersHorizontal } from 'lucide-react';
import { producerService } from '../services/api/producerService';

const ProducersPage = () => {
  const [producers, setProducers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [sortBy, setSortBy] = useState('name');

  const provinces = [
    'Estuaire',
    'Haut-Ogooué',
    'Moyen-Ogooué',
    'Ngounié',
    'Nyanga',
    'Ogooué-Ivindo',
    'Ogooué-Lolo',
    'Ogooué-Maritime',
    'Woleu-Ntem'
  ];

  useEffect(() => {
    fetchProducers();
  }, [selectedProvince, sortBy]);

  const fetchProducers = async () => {
    try {
      setLoading(true);
      let data;

      if (selectedProvince) {
        data = await producerService.getProducersByProvince(selectedProvince);
      } else {
        data = await producerService.getAllProducers({ sort: sortBy });
      }

      const producersArray = Array.isArray(data) ? data : (data.data || []);
      setProducers(producersArray);
    } catch (error) {
      console.error('Erreur lors du chargement des producteurs:', error);
      setProducers([]);
    } finally {
      setLoading(false);
    }
  };

  // Filtrer par recherche
  const filteredProducers = producers.filter(producer => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (producer.nomResponsable?.toLowerCase().includes(searchLower)) ||
      (producer.nomStructure?.toLowerCase().includes(searchLower)) ||
      (producer.province?.toLowerCase().includes(searchLower)) ||
      (producer.villeProduction?.toLowerCase().includes(searchLower))
    );
  });

  // Fonction pour obtenir l'URL de l'image
  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent('Producteur')}&size=200&background=16a34a&color=fff`;
    }
    if (imagePath.startsWith('http')) return imagePath;
    return `${import.meta.env.VITE_API_URL}/storage/${imagePath}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Nos Producteurs
          </h1>
          <p className="text-gray-600">
            Découvrez les agriculteurs passionnés qui cultivent vos produits
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
                placeholder="Rechercher un producteur..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Province Filter */}
            <select
              value={selectedProvince || ''}
              onChange={(e) => setSelectedProvince(e.target.value || null)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Toutes les provinces</option>
              {provinces.map(province => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="name">Nom (A-Z)</option>
              <option value="recent">Plus récents</option>
              <option value="products">Nombre de produits</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : filteredProducers.length > 0 ? (
          <>
            <div className="mb-4 text-gray-600">
              {filteredProducers.length} producteur{filteredProducers.length > 1 ? 's' : ''} trouvé{filteredProducers.length > 1 ? 's' : ''}
            </div>

            {/* Producers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducers.map(producer => (
                <Link
                  key={producer.id}
                  to={`/producers/${producer.id}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Image Header */}
                  <div className="relative h-48 bg-gradient-to-br from-green-100 to-green-200 overflow-hidden">
                    <img
                      src={getImageUrl(producer.photo)}
                      alt={producer.nomResponsable || producer.nomStructure}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(producer.nomResponsable || 'P')}&size=200&background=16a34a&color=fff`;
                      }}
                    />
                    
                    {/* Badge */}
                    {producer.certifications && producer.certifications.length > 0 && (
                      <div className="absolute top-3 right-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        Certifié
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Name */}
                    <h3 className="font-bold text-xl mb-2 group-hover:text-green-600 transition">
                      {producer.nomStructure || producer.nomResponsable}
                    </h3>

                    {/* Responsible */}
                    {producer.nomStructure && producer.nomResponsable && (
                      <p className="text-sm text-gray-600 mb-3">
                        Par {producer.nomResponsable}
                      </p>
                    )}

                    {/* Location */}
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="text-sm">
                        {producer.villeProduction || producer.province || 'Gabon'}
                      </span>
                    </div>

                    {/* Production Types */}
                    {producer.typesProduction && Array.isArray(producer.typesProduction) && producer.typesProduction.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {producer.typesProduction.slice(0, 3).map((type, index) => (
                          <span
                            key={index}
                            className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold"
                          >
                            {type}
                          </span>
                        ))}
                        {producer.typesProduction.length > 3 && (
                          <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-semibold">
                            +{producer.typesProduction.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
                      <div className="flex items-center space-x-1">
                        <Package className="h-4 w-4" />
                        <span>{producer.products_count || 0} produits</span>
                      </div>
                      {producer.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{producer.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-gray-500 text-lg mb-2">Aucun producteur trouvé</p>
            <p className="text-gray-400 text-sm">
              Essayez de modifier vos critères de recherche
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProducersPage;