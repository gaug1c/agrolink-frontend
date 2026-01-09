import React, { useState } from 'react';
import { ShoppingCart, Heart, Share2, Truck, Shield, RefreshCw } from 'lucide-react';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import QuantitySelector from './QuantitySelector';
import ProductReviews from './ProductReviews';
import RelatedProducts from './RelatedProducts';
import Button from '../common/Button';
import { Toast } from '../common/Alert';

const ProductDetail = ({ 
  product,
  relatedProducts = [],
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
  className = '' 
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [showToast, setShowToast] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async () => {
    setAdding(true);
    
    if (onAddToCart) {
      await onAddToCart(product.id, quantity);
    }

    setTimeout(() => {
      setAdding(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.title,
        text: product.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copier le lien
      navigator.clipboard.writeText(window.location.href);
      alert('Lien copié dans le presse-papier !');
    }
  };

  const totalPrice = product.price * quantity;

  return (
    <div className={className}>
      {/* Toast Notification */}
      {showToast && (
        <Toast
          type="success"
          message={`${quantity} ${product.title} ajouté(s) au panier !`}
          position="top-right"
          onClose={() => setShowToast(false)}
        />
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Left: Gallery */}
        <div>
          <ProductGallery 
            images={product.images || ['🍅', '🍅', '🍅', '🍅']} 
            productName={product.title}
          />
        </div>

        {/* Right: Info & Actions */}
        <div className="space-y-6">
          <ProductInfo product={product} />

          {/* Quantity & Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
            {/* Quantity */}
            <QuantitySelector
              initialQuantity={quantity}
              max={product.stockQuantity || 99}
              onChange={setQuantity}
              disabled={!product.inStock}
            />

            {/* Total Price */}
            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
              <div className="flex items-baseline justify-between">
                <span className="text-gray-700 font-medium">Total:</span>
                <span className="text-3xl font-bold text-green-600">
                  {totalPrice.toLocaleString()} FCFA
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mt-6">
              <Button
                fullWidth
                size="lg"
                loading={adding}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                icon={<ShoppingCart className="w-5 h-5" />}
              >
                {product.inStock ? 'Ajouter au panier' : 'Rupture de stock'}
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  fullWidth
                  variant="outline"
                  onClick={() => onToggleFavorite && onToggleFavorite(product.id)}
                  icon={<Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />}
                  className={isFavorite ? 'border-red-500 text-red-500' : ''}
                >
                  {isFavorite ? 'Favoris' : 'Ajouter'}
                </Button>

                <Button
                  fullWidth
                  variant="ghost"
                  onClick={handleShare}
                  icon={<Share2 className="w-5 h-5" />}
                >
                  Partager
                </Button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="mt-6 space-y-3 border-t pt-6">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Livraison rapide</p>
                  <p className="text-sm text-gray-600">24-48h à Libreville</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Garantie fraîcheur</p>
                  <p className="text-sm text-gray-600">Produits frais ou remboursé</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <RefreshCw className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-gray-800">Retour facile</p>
                  <p className="text-sm text-gray-600">Sous 24h si non satisfait</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white rounded-2xl shadow-lg mb-16">
        {/* Tab Headers */}
        <div className="border-b border-gray-200">
          <div className="flex gap-8 px-8">
            {[
              { id: 'description', label: 'Description' },
              { id: 'specifications', label: 'Spécifications' },
              { id: 'reviews', label: `Avis (${product.reviews || 0})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 font-semibold transition ${
                  activeTab === tab.id
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-8">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <h3 className="text-xl font-bold mb-4">À propos de ce produit</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {product.description}
              </p>
              {product.features && product.features.length > 0 && (
                <div>
                  <h4 className="font-bold mb-3">Caractéristiques :</h4>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        </div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'specifications' && (
            <div>
              <h3 className="text-xl font-bold mb-4">Spécifications techniques</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">{key}</p>
                    <p className="font-semibold text-gray-800">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <ProductReviews
              productId={product.id}
              reviews={product.reviewsList || []}
              averageRating={product.rating || 0}
              totalReviews={product.reviews || 0}
            />
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <RelatedProducts
          products={relatedProducts}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </div>
  );
};

export default ProductDetail;