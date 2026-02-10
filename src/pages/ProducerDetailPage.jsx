import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, ArrowLeft, MapPin, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { productService } from '../services/api/productService';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await productService.getProductById(id);
      setProduct(data);
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    const result = await addToCart(product, quantity);
    if (result.success) {
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } else {
      alert(result.message);
    }
  };

  // Gérer les images
  const getImages = () => {
    if (!product?.images) return [];
    if (typeof product.images === 'string') {
      try {
        return JSON.parse(product.images);
      } catch {
        return [product.images];
      }
    }
    return Array.isArray(product.images) ? product.images : [];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Produit non trouvé</p>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Retour aux produits
          </button>
        </div>
      </div>
    );
  }

  const images = getImages();
  const mainImage = images[selectedImage] || images[0] || '/placeholder.jpg';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Notification */}
        {showNotification && (
          <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
            <p className="font-semibold">Produit ajouté au panier !</p>
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour
        </button>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Images Section */}
            <div>
              <div className="relative mb-4 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                  onError={(e) => {
                    e.target.src = '/placeholder.jpg';
                  }}
                />
                
                {!product.is_available && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">Rupture de stock</span>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {images.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${product.name} ${idx + 1}`}
                      onClick={() => setSelectedImage(idx)}
                      className={`cursor-pointer rounded-lg h-20 object-cover transition ${
                        selectedImage === idx ? 'ring-2 ring-green-600' : 'opacity-60 hover:opacity-100'
                      }`}
                      onError={(e) => {
                        e.target.src = '/placeholder.jpg';
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Section */}
            <div>
              {/* Category Badge */}
              {product.category && (
                <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold mb-3">
                  {product.category.name}
                </span>
              )}

              {/* Product Name */}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">({product.rating})</span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-green-600">
                  {Number(product.price).toLocaleString()} FCFA
                </span>
                {product.old_price && (
                  <span className="text-xl text-gray-400 line-through">
                    {Number(product.old_price).toLocaleString()} FCFA
                  </span>
                )}
                {product.unit && (
                  <span className="text-gray-500">/ {product.unit}</span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Stock Info */}
              {product.stock && (
                <div className="mb-6">
                  <p className={`text-sm font-medium ${
                    product.stock < 10 ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    {product.stock < 10 
                      ? `Plus que ${product.stock} en stock !`
                      : `En stock (${product.stock} disponibles)`
                    }
                  </p>
                </div>
              )}

              {/* Quantity Selector */}
              {product.is_available && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantité
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock || 99, quantity + 1))}
                      className="w-10 h-10 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.is_available}
                  className={`flex-1 py-3 rounded-lg font-semibold transition flex items-center justify-center space-x-2 ${
                    product.is_available
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>{product.is_available ? 'Ajouter au panier' : 'Rupture de stock'}</span>
                </button>
                <button className="w-12 h-12 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center transition">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="w-12 h-12 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center transition">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>

              {/* Producer Info */}
              {product.producer && (
                <div className="border-t pt-6">
                  <h3 className="font-semibold mb-3 text-gray-800">Producteur</h3>
                  <div className="flex items-center space-x-3 bg-gray-50 p-4 rounded-lg">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {product.producer.name?.[0]?.toUpperCase() || 'P'}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{product.producer.name}</p>
                      {product.producer.location && (
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{product.producer.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductDetailPage;