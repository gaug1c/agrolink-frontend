import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '../common/Card';
import Button from '../common/Button';

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Tous', icon: '🌿' },
    { id: 'legumes', label: 'Légumes', icon: '🥬' },
    { id: 'fruits', label: 'Fruits', icon: '🍎' },
    { id: 'viandes', label: 'Viandes', icon: '🥩' },
    { id: 'laitiers', label: 'Laitiers', icon: '🥛' },
    { id: 'cereales', label: 'Céréales', icon: '🌾' },
  ];

  const products = [
    {
      id: 1,
      image: '🍅',
      title: 'Tomates Fraîches Bio',
      category: 'legumes',
      price: 2500,
      oldPrice: 3000,
      rating: 4.8,
      badge: '-17%',
    },
    {
      id: 2,
      image: '🥕',
      title: 'Carottes du Gabon',
      category: 'legumes',
      price: 1800,
      rating: 4.6,
    },
    {
      id: 3,
      image: '🥚',
      title: 'Œufs Frais de Poules',
      category: 'laitiers',
      price: 3500,
      rating: 4.9,
      badge: 'Populaire',
    },
    {
      id: 4,
      image: '🥬',
      title: 'Laitue Croquante',
      category: 'legumes',
      price: 1200,
      oldPrice: 1500,
      rating: 4.5,
      badge: '-20%',
    },
    {
      id: 5,
      image: '🐔',
      title: 'Poulet Fermier',
      category: 'viandes',
      price: 8500,
      rating: 4.7,
    },
    {
      id: 6,
      image: '🍌',
      title: 'Bananes Plantain',
      category: 'fruits',
      price: 2000,
      rating: 4.8,
    },
    {
      id: 7,
      image: '🥒',
      title: 'Concombres Bio',
      category: 'legumes',
      price: 1500,
      rating: 4.6,
    },
    {
      id: 8,
      image: '🌽',
      title: 'Maïs Local',
      category: 'cereales',
      price: 1800,
      rating: 4.4,
    },
  ];

  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const displayedProducts = filteredProducts.slice(0, 6);

  const handleAddToCart = (productId) => {
    console.log('Ajouter au panier:', productId);
    // Logique d'ajout au panier
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Nos <span className="text-green-600">Produits</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Découvrez notre sélection de produits frais et locaux, 
            directement des producteurs gabonais vers votre table
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all
                ${activeCategory === category.id
                  ? 'bg-green-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-600 shadow-md'
                }
              `}
            >
              <span className="text-xl">{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              oldPrice={product.oldPrice}
              rating={product.rating}
              category={product.category}
              badge={product.badge}
              onAddToCart={() => handleAddToCart(product.id)}
              onClick={() => window.location.href = `/produits/${product.id}`}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link to="/produits">
            <Button 
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
            >
              Voir tous les produits
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🚚</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Livraison Rapide</h3>
            <p className="text-gray-600 text-sm">
              Livraison en 24-48h dans tout Libreville
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">✓</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Produits Garantis</h3>
            <p className="text-gray-600 text-sm">
              Fraîcheur et qualité garanties ou remboursé
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">💚</span>
            </div>
            <h3 className="font-bold text-lg mb-2">100% Local</h3>
            <p className="text-gray-600 text-sm">
              Soutenez l'agriculture gabonaise
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;