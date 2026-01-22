import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '../common/Card';
import Button from '../common/Button';
import { useCart } from '../../context/CartContext';

const ProductsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const { addToCart } = useCart();

  // Catégories (avec icônes emoji)
  const categories = [
    { id: 'all', label: 'Tous', icon: '🌿' },
    { id: 'legumes', label: 'Légumes', icon: '🥬' },
    { id: 'fruits', label: 'Fruits', icon: '🍎' },
    { id: 'viandes', label: 'Viandes', icon: '🥩' },
    { id: 'laitiers', label: 'Laitiers', icon: '🥛' },
    { id: 'cereales', label: 'Céréales', icon: '🌾' },
  ];

  // Produits (image = URL)
  const products = [
    {
      id: 1,
      image: 'https://afrique.le360.ma/resizer/BqmgUPmJbuGwCg7WO4RKJwiW1OE=/arc-photo-le360/eu-central-1-prod/public/4ADKUGBPRNGHVKZIKVROBUI3X4.jpg',
      title: 'Tomates Fraîches Bio',
      category: 'legumes',
      price: 2500,
      oldPrice: 3000,
      rating: 4.8,
      badge: '-17%',
    },
    {
      id: 2,
      image: 'https://okhamare.com/cdn/shop/articles/Championne-la-carotte.jpg?v=1728292606',
      title: 'Carottes du Gabon',
      category: 'legumes',
      price: 1800,
      rating: 4.6,
    },
    {
      id: 3,
      image: 'https://www.regal-basse-cour.com/wp-content/uploads/2021/07/oeufs-supermarche.jpg',
      title: 'Œufs Frais de Poules',
      category: 'laitiers',
      price: 3500,
      rating: 4.9,
      badge: 'Populaire',
    },
    {
      id: 4,
      image: 'https://binette-et-jardin.ouest-france.fr/images/dossiers/2017-07/batavia-163430.jpg',
      title: 'Laitue Croquante',
      category: 'legumes',
      price: 1200,
      oldPrice: 1500,
      rating: 4.5,
      badge: '-20%',
    },
    {
      id: 5,
      image: 'https://www.sikafinance.com/api/image/ImageNewsGet?id=0269899E-1740-49E8-BE10-7F1B2F717E1A',
      title: 'Poulet Fermier',
      category: 'viandes',
      price: 8500,
      rating: 4.7,
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400',
      title: 'Bananes Plantain',
      category: 'fruits',
      price: 2000,
      rating: 4.8,
    },
  ];

  // Filtrage
  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  const displayedProducts = filteredProducts.slice(0, 6);

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Nos <span className="text-green-600">Produits</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Produits frais et locaux, directement des producteurs gabonais
          </p>
        </div>

        {/* FILTRE CATEGORIES */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition
                ${
                  activeCategory === category.id
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-green-50'
                }
              `}
            >
              <span className="text-xl">{category.icon}</span>
              <span>{category.label}</span>
            </button>
          ))}
        </div>

        {/* GRID PRODUITS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              oldPrice={product.oldPrice}
              rating={product.rating}
              badge={product.badge}
              onAddToCart={() => handleAddToCart(product)}
              onClick={() => (window.location.href = `/produits/${product.id}`)}
            />
          ))}
        </div>

        {/* CTA */}
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
      </div>
    </section>
  );
};

export default ProductsSection;