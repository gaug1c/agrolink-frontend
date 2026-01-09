import React, { useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';

const QuantitySelector = ({
  initialQuantity = 1,
  min = 1,
  max = 99,
  step = 1,
  onChange,
  disabled = false,
  size = 'md',
  showLabel = true,
  className = '',
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleIncrement = () => {
    if (quantity < max && !disabled) {
      const newQuantity = quantity + step;
      setQuantity(newQuantity);
      if (onChange) onChange(newQuantity);
    }
  };

  const handleDecrement = () => {
    if (quantity > min && !disabled) {
      const newQuantity = quantity - step;
      setQuantity(newQuantity);
      if (onChange) onChange(newQuantity);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || min;
    const clampedValue = Math.max(min, Math.min(max, value));
    setQuantity(clampedValue);
    if (onChange) onChange(clampedValue);
  };

  // Sizes
  const sizes = {
    sm: {
      button: 'w-8 h-8',
      input: 'w-12 text-sm',
      icon: 'w-4 h-4',
    },
    md: {
      button: 'w-10 h-10',
      input: 'w-16 text-base',
      icon: 'w-5 h-5',
    },
    lg: {
      button: 'w-12 h-12',
      input: 'w-20 text-lg',
      icon: 'w-6 h-6',
    },
  };

  const currentSize = sizes[size];

  return (
    <div className={className}>
      {showLabel && (
        <label className="block text-gray-700 font-semibold mb-2">
          Quantité
        </label>
      )}

      <div className="flex items-center gap-2">
        {/* Decrement Button */}
        <button
          onClick={handleDecrement}
          disabled={disabled || quantity <= min}
          className={`
            ${currentSize.button}
            bg-gray-100 hover:bg-gray-200 
            rounded-lg flex items-center justify-center
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-green-500
          `}
          aria-label="Diminuer la quantité"
        >
          <Minus className={currentSize.icon} />
        </button>

        {/* Quantity Input */}
        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          min={min}
          max={max}
          disabled={disabled}
          className={`
            ${currentSize.input}
            text-center font-bold border-2 border-gray-300 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            transition-all duration-200
          `}
        />

        {/* Increment Button */}
        <button
          onClick={handleIncrement}
          disabled={disabled || quantity >= max}
          className={`
            ${currentSize.button}
            bg-gray-100 hover:bg-gray-200 
            rounded-lg flex items-center justify-center
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-green-500
          `}
          aria-label="Augmenter la quantité"
        >
          <Plus className={currentSize.icon} />
        </button>

        {/* Stock Info */}
        {max < 99 && (
          <span className="text-sm text-gray-500 ml-2">
            (Max: {max})
          </span>
        )}
      </div>
    </div>
  );
};

// Variant compact pour les cartes de produits
export const CompactQuantitySelector = ({
  quantity = 1,
  onChange,
  disabled = false,
}) => {
  const handleIncrement = () => {
    if (!disabled) onChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1 && !disabled) onChange(quantity - 1);
  };

  return (
    <div className="inline-flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
      <button
        onClick={handleDecrement}
        disabled={disabled || quantity <= 1}
        className="px-3 py-1 bg-gray-50 hover:bg-gray-100 transition disabled:opacity-50"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="px-4 py-1 font-bold text-gray-800 min-w-[3rem] text-center">
        {quantity}
      </span>
      <button
        onClick={handleIncrement}
        disabled={disabled}
        className="px-3 py-1 bg-gray-50 hover:bg-gray-100 transition disabled:opacity-50"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};

export default QuantitySelector;