import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, TrendingUp, Award, ArrowRight } from 'lucide-react';
import Button from '../common/Button';

const ProducerCard = ({
  id,
  name,
  image,
  location,
  specialty,
  rating,
  reviews,
  productsCount,
  badge,
  description,
  verified = false,
  className = '',
}) => {
  return (
    <Link to={`/producteurs/${id}`}>
      <div className={`
        bg-white rounded-2xl shadow-md hover:shadow-xl
        transition-all duration-300 overflow-hidden
        group cursor-pointer
        ${className}
      `}>
        {/* Header with Image */}
        <div className="relative bg-gradient-to-br from-green-100 to-green-200 p-8">
          {/* Badge */}
          {badge && (
            <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
              <Award className="w-3 h-3" />
              {badge}
            </div>
          )}
          
          {/* Producer Image */}
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto text-5xl shadow-lg group-hover:scale-110 transition-transform relative">
            {image}
            {verified && (
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Name */}
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition">
            {name}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-600 mb-3">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{location}</span>
          </div>

          {/* Specialty */}
          <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mb-3">
            {specialty}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {description}
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-gray-800">{rating}</span>
              </div>
              <p className="text-xs text-gray-600">{reviews} avis</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="font-bold text-gray-800">{productsCount}</span>
              </div>
              <p className="text-xs text-gray-600">Produits</p>
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            fullWidth 
            variant="outline"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            className="group-hover:bg-green-600 group-hover:text-white group-hover:border-green-600"
          >
            Voir le profil
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProducerCard;