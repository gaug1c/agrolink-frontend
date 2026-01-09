import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({
  size = 'md',
  variant = 'spinner',
  fullScreen = false,
  text,
  color = 'green',
  className = '',
}) => {
  // Sizes
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  // Colors
  const colors = {
    green: 'text-green-600',
    blue: 'text-blue-600',
    red: 'text-red-600',
    gray: 'text-gray-600',
    white: 'text-white',
  };

  // Spinner Loader
  const SpinnerLoader = () => (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 className={`${sizes[size]} ${colors[color]} animate-spin`} />
      {text && (
        <p className={`text-sm ${colors[color]} font-medium`}>{text}</p>
      )}
    </div>
  );

  // Dots Loader
  const DotsLoader = () => (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="flex gap-2">
        <div className={`w-3 h-3 ${colors[color].replace('text-', 'bg-')} rounded-full animate-bounce`} style={{ animationDelay: '0ms' }} />
        <div className={`w-3 h-3 ${colors[color].replace('text-', 'bg-')} rounded-full animate-bounce`} style={{ animationDelay: '150ms' }} />
        <div className={`w-3 h-3 ${colors[color].replace('text-', 'bg-')} rounded-full animate-bounce`} style={{ animationDelay: '300ms' }} />
      </div>
      {text && (
        <p className={`text-sm ${colors[color]} font-medium`}>{text}</p>
      )}
    </div>
  );

  // Pulse Loader
  const PulseLoader = () => (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizes[size]} ${colors[color].replace('text-', 'bg-')} rounded-full animate-pulse`} />
      {text && (
        <p className={`text-sm ${colors[color]} font-medium`}>{text}</p>
      )}
    </div>
  );

  // Bars Loader
  const BarsLoader = () => (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className="flex items-end gap-1 h-8">
        <div className={`w-2 ${colors[color].replace('text-', 'bg-')} rounded-full animate-pulse`} style={{ height: '40%', animationDelay: '0ms' }} />
        <div className={`w-2 ${colors[color].replace('text-', 'bg-')} rounded-full animate-pulse`} style={{ height: '60%', animationDelay: '150ms' }} />
        <div className={`w-2 ${colors[color].replace('text-', 'bg-')} rounded-full animate-pulse`} style={{ height: '80%', animationDelay: '300ms' }} />
        <div className={`w-2 ${colors[color].replace('text-', 'bg-')} rounded-full animate-pulse`} style={{ height: '60%', animationDelay: '450ms' }} />
        <div className={`w-2 ${colors[color].replace('text-', 'bg-')} rounded-full animate-pulse`} style={{ height: '40%', animationDelay: '600ms' }} />
      </div>
      {text && (
        <p className={`text-sm ${colors[color]} font-medium`}>{text}</p>
      )}
    </div>
  );

  // Ring Loader
  const RingLoader = () => (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizes[size]} rounded-full border-4 border-gray-200 border-t-transparent animate-spin`} style={{ borderTopColor: colors[color].includes('green') ? '#16a34a' : undefined }} />
      {text && (
        <p className={`text-sm ${colors[color]} font-medium`}>{text}</p>
      )}
    </div>
  );

  // Select variant
  const loaderVariants = {
    spinner: <SpinnerLoader />,
    dots: <DotsLoader />,
    pulse: <PulseLoader />,
    bars: <BarsLoader />,
    ring: <RingLoader />,
  };

  const loaderContent = loaderVariants[variant] || <SpinnerLoader />;

  // Full screen loader
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {loaderContent}
      </div>
    );
  }

  // Regular loader
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {loaderContent}
    </div>
  );
};

// Skeleton Loader (pour le chargement de contenu)
export const Skeleton = ({
  width = 'full',
  height = '4',
  rounded = 'md',
  className = '',
}) => {
  const widths = {
    full: 'w-full',
    '1/2': 'w-1/2',
    '1/3': 'w-1/3',
    '1/4': 'w-1/4',
    '3/4': 'w-3/4',
  };

  const heights = {
    '2': 'h-2',
    '3': 'h-3',
    '4': 'h-4',
    '6': 'h-6',
    '8': 'h-8',
    '12': 'h-12',
    '16': 'h-16',
    '24': 'h-24',
    '32': 'h-32',
  };

  const roundeds = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full',
  };

  return (
    <div
      className={`
        ${widths[width] || width}
        ${heights[height] || height}
        ${roundeds[rounded]}
        bg-gray-200 animate-pulse
        ${className}
      `}
    />
  );
};

// Card Skeleton (pour les cartes de produits)
export const CardSkeleton = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
          <Skeleton height="48" rounded="none" />
          <div className="p-4 space-y-3">
            <Skeleton width="1/2" height="3" />
            <Skeleton width="full" height="4" />
            <Skeleton width="3/4" height="3" />
            <div className="flex gap-2">
              <Skeleton width="1/3" height="6" />
              <Skeleton width="1/4" height="6" />
            </div>
            <Skeleton width="full" height="10" rounded="lg" />
          </div>
        </div>
      ))}
    </>
  );
};

// Page Loader (loader de page complet)
export const PageLoader = ({ text = 'Chargement...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="bg-white rounded-2xl shadow-2xl p-12">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-3xl animate-bounce">
            🅰
          </div>
          <Loader size="lg" variant="spinner" color="green" />
          <p className="text-gray-600 font-medium">{text}</p>
          <div className="flex gap-2 mt-2">
            <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;