import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Mail, Package, Star, Award, Leaf } from 'lucide-react';
import { producerService } from '../services/api/producerService';
import ProductCard from '../components/products/ProductCard';

const ProducerDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producer, setProducer] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    fetchProducerDetails();
    fetchProducerProducts();
  }, [id]);

  const fetchProducerDetails = async () => {
    try {
      setLoading(true);
      const data = await producerService.getProducerById(id);
      setProducer(data);
    } catch (error) {
      console.error('Erreur lors du chargement du producteur:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducerProducts = async () => {
    try {
      setProductsLoading(true);
      const data = await producerService.getProducerProducts(id);
      const productsArray = Array.isArray(data) ? data : (data.data || []);
      setProducts(productsArray);
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  };

  // Fonction pour obtenir l'URL de l'image
  const getImageUrl = (imagePath) => {
    if (!imagePath) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(producer?.nomResponsable || 'P')}&size=400&background=16a34a&color=fff`;
    }
    if (imagePath.startsWith('http')) return imagePath;
    return `${import.meta.env.VITE_API_URL}/storage/${imagePath}`;
  };

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

  if (!producer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Producteur non trouvé</p>
          <button
            onClick={() => navigate('/producers')}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Retour aux producteurs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour
        </button>

        {/* Producer Header */}
        <div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
          <div className="md:flex">
            {/* Image */}
            <div className="md:w-1/3 bg-gradient-to-br from-green-100 to-green-200">
              <img
                src={getImageUrl(producer.photo)}
                alt={producer.nomResponsable || producer.nomStructure}
                className="w-full h-full object-cover min-h-[300px]"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(producer.nomResponsable || 'P')}&size=400&background=16a34a&color=fff`;
                }}
              />
            </div>

            {/* Info */}
            <div className="md:w-2/3 p-8">
              {/* Title */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {producer.nomStructure || producer.nomResponsable}
                  </h1>
                  {producer.nomStructure && producer.nomResponsable && (
                    <p className="text-lg text-gray-600">
                      Responsable: {producer.nomResponsable}
                    </p>
                  )}
                </div>

                {/* Badge */}
                {producer.certifications && producer.certifications.length > 0 && (
                  <span className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-bold">
                    <Award className="w-5 h-5" />
                    Certifié
                  </span>
                )}
              </div>

              {/* Rating */}
              {producer.rating && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(producer.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 font-medium">
                    {producer.rating} ({producer.reviews_count || 0} avis)
                  </span>
                </div>
              )}

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                {(producer.villeProduction || producer.province) && (
                  <div className="flex items-center text-gray-700">
                    <MapPin className="w-5 h-5 mr-3 text-green-600" />
                    <span>
                      {producer.villeProduction && `${producer.villeProduction}, `}
                      {producer.province}
                    </span>
                  </div>
                )}
                
                {producer.phoneproducer && (
                  <div className="flex items-center text-gray-700">
                    <Phone className="w-5 h-5 mr-3 text-green-600" />
                    <a href={`tel:${producer.phoneproducer}`} className="hover:text-green-600 transition">
                      {producer.phoneproducer}
                    </a>
                  </div>
                )}
                
                {producer.emailproducer && (
                  <div className="flex items-center text-gray-700">
                    <Mail className="w-5 h-5 mr-3 text-green-600" />
                    <a href={`mailto:${producer.emailproducer}`} className="hover:text-green-600 transition">
                      {producer.emailproducer}
                    </a>
                  </div>
                )}
              </div>

              {/* Production Types */}
              {producer.typesProduction && Array.isArray(producer.typesProduction) && producer.typesProduction.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Leaf className="w-4 h-4 mr-2 text-green-600" />
                    Types de production
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {producer.typesProduction.map((type, index) => (
                      <span
                        key={index}
                        className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Package className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {producer.products_count || products.length || 0}
                  </div>
                  <div className="text-sm text-gray-600">Produits</div>
                </div>

                {producer.orders_count !== undefined && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">
                      {producer.orders_count}
                    </div>
                    <div className="text-sm text-gray-600">Commandes</div>
                  </div>
                )}

                {producer.created_at && (
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">
                      {new Date(producer.created_at).getFullYear()}
                    </div>
                    <div className="text-sm text-gray-600">Depuis</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Produits de ce producteur
          </h2>

          {productsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-96"></div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <p className="text-gray-500 text-lg mb-2">
                Aucun produit disponible pour le moment
              </p>
              <p className="text-gray-400 text-sm">
                Ce producteur n'a pas encore ajouté de produits
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProducerDetailPage;