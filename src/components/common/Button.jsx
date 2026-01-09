import React from 'react';
import { Loader } from 'lucide-react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  // Variants
  const variants = {
    primary: 'bg-green-600 hover:bg-green-700 text-white shadow-md',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white shadow-md',
    outline: 'border-2 border-green-600 text-green-600 hover:bg-green-50',
    ghost: 'text-green-600 hover:bg-green-50',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-md',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-md',
  };

  // Sizes
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    xl: 'px-8 py-4 text-xl',
  };

  // Base classes
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-semibold rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={baseClasses}
      {...props}
    >
      {loading && (
        <Loader className="w-4 h-4 animate-spin" />
      )}
      
      {!loading && icon && iconPosition === 'left' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      
      <span>{children}</span>
      
      {!loading && icon && iconPosition === 'right' && (
        <span className="flex-shrink-0">{icon}</span>
      )}
    </button>
  );
};

// Composants spécialisés
export const IconButton = ({ 
  icon, 
  size = 'md',
  variant = 'ghost',
  className = '',
  ...props 
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  return (
    <Button
      variant={variant}
      className={`!p-0 ${sizes[size]} ${className}`}
      {...props}
    >
      {icon}
    </Button>
  );
};

export const LinkButton = ({ 
  href, 
  external = false,
  children,
  ...props 
}) => {
  const classes = `
    inline-flex items-center justify-center gap-2
    px-4 py-2 font-semibold rounded-lg
    bg-green-600 hover:bg-green-700 text-white
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
  `;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
};

export default Button;