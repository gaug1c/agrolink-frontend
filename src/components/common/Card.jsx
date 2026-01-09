import React from 'react';

const Card = ({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  shadow = 'md',
  className = '',
  onClick,
  ...props
}) => {
  // Variants
  const variants = {
    default: 'bg-white border border-gray-200',
    primary: 'bg-green-50 border border-green-200',
    secondary: 'bg-gray-50 border border-gray-200',
    success: 'bg-emerald-50 border border-emerald-200',
    warning: 'bg-yellow-50 border border-yellow-200',
    danger: 'bg-red-50 border border-red-200',
    gradient: 'bg-gradient-to-br from-green-50 to-green-100 border border-green-200',
  };

  // Padding
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4 md:p-6',
    lg: 'p-6 md:p-8',
    xl: 'p-8 md:p-12',
  };

  // Shadow
  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  // Hover effect
  const hoverEffect = hover ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' : '';

  return (
    <div
      onClick={onClick}
      className={`
        rounded-xl transition-all duration-300
        ${variants[variant]}
        ${paddings[padding]}
        ${shadows[shadow]}
        ${hoverEffect}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

// Card Header
export const CardHeader = ({ 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <div 
      className={`mb-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Card Title
export const CardTitle = ({ 
  children, 
  size = 'xl',
  className = '',
  ...props 
}) => {
  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
  };

  return (
    <h3 
      className={`font-bold text-gray-800 ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </h3>
  );
};

// Card Description
export const CardDescription = ({ 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <p 
      className={`text-gray-600 text-sm mt-1 ${className}`}
      {...props}
    >
      {children}
    </p>
  );
};

// Card Body
export const CardBody = ({ 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <div 
      className={`${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Card Footer
export const CardFooter = ({ 
  children, 
  className = '',
  divided = false,
  ...props 
}) => {
  return (
    <div 
      className={`
        mt-4
        ${divided ? 'pt-4 border-t border-gray-200' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

// Product Card (Composant spécialisé)
export const ProductCard = ({
  image,
  title,
  price,
  oldPrice,
  rating,
  category,
  badge,
  onAddToCart,
  onClick,
  className = '',
}) => {
  return (
    <Card
      hover
      padding="none"
      className={`overflow-hidden group ${className}`}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-green-100 to-green-200 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-300">
          {image}
        </div>
        
        {/* Badge */}
        {badge && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            {badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        {category && (
          <span className="inline-block text-xs text-green-600 font-semibold mb-2">
            {category}
          </span>
        )}

        {/* Title */}
        <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2">
          {title}
        </h3>

        {/* Rating */}
        {rating && (
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={i < rating ? 'text-yellow-400' : 'text-gray-300'}>
                ★
              </span>
            ))}
            <span className="text-xs text-gray-500 ml-1">({rating})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold text-green-600">
            {price} FCFA
          </span>
          {oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              {oldPrice} FCFA
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        {onAddToCart && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart();
            }}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Ajouter au panier
          </button>
        )}
      </div>
    </Card>
  );
};

// Stats Card (Composant spécialisé)
export const StatsCard = ({
  title,
  value,
  icon,
  trend,
  trendValue,
  color = 'green',
  className = '',
}) => {
  const colors = {
    green: 'bg-green-50 text-green-600',
    blue: 'bg-blue-50 text-blue-600',
    red: 'bg-red-50 text-red-600',
    yellow: 'bg-yellow-50 text-yellow-600',
  };

  return (
    <Card hover className={className}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mb-2">{value}</p>
          {trend && (
            <p className={`text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? '↑' : '↓'} {trendValue}
            </p>
          )}
        </div>
        {icon && (
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colors[color]}`}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};

export default Card;