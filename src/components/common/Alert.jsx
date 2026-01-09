import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const Alert = ({
  type = 'info',
  title,
  message,
  dismissible = true,
  onDismiss,
  autoClose = false,
  autoCloseDuration = 5000,
  icon: CustomIcon,
  className = '',
  children,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  // Auto close
  useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, autoCloseDuration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDuration, isVisible]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };

  if (!isVisible) return null;

  // Alert types configuration
  const types = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-800',
      iconColor: 'text-green-500',
    },
    error: {
      icon: AlertCircle,
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      iconColor: 'text-red-500',
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800',
      iconColor: 'text-yellow-500',
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      iconColor: 'text-blue-500',
    },
  };

  const config = types[type];
  const Icon = CustomIcon || config.icon;

  return (
    <div
      className={`
        ${config.bgColor} ${config.borderColor} ${config.textColor}
        border-l-4 rounded-lg p-4
        transition-all duration-300
        ${className}
      `}
      role="alert"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0">
          <Icon className={`w-5 h-5 ${config.iconColor}`} />
        </div>

        {/* Content */}
        <div className="flex-1">
          {title && (
            <h4 className="font-bold mb-1">
              {title}
            </h4>
          )}
          {message && (
            <p className="text-sm">
              {message}
            </p>
          )}
          {children && (
            <div className="mt-2">
              {children}
            </div>
          )}
        </div>

        {/* Dismiss Button */}
        {dismissible && (
          <button
            onClick={handleDismiss}
            className={`
              flex-shrink-0 p-1 rounded-lg
              hover:bg-black hover:bg-opacity-5
              transition-colors
            `}
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

// Toast Notification (pour les notifications flottantes)
export const Toast = ({
  type = 'info',
  message,
  position = 'top-right',
  autoClose = true,
  autoCloseDuration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) onClose();
      }, autoCloseDuration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDuration, onClose]);

  if (!isVisible) return null;

  const positions = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  };

  const types = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-600',
      iconColor: 'text-white',
    },
    error: {
      icon: AlertCircle,
      bgColor: 'bg-red-600',
      iconColor: 'text-white',
    },
    warning: {
      icon: AlertTriangle,
      bgColor: 'bg-yellow-500',
      iconColor: 'text-white',
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-600',
      iconColor: 'text-white',
    },
  };

  const config = types[type];
  const Icon = config.icon;

  return (
    <div
      className={`
        fixed ${positions[position]} z-50
        ${config.bgColor} text-white
        px-6 py-4 rounded-lg shadow-2xl
        flex items-center gap-3
        animate-slide-in
        max-w-md
      `}
    >
      <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0`} />
      <p className="text-sm font-medium">{message}</p>
      <button
        onClick={() => {
          setIsVisible(false);
          if (onClose) onClose();
        }}
        className="ml-auto p-1 hover:bg-black hover:bg-opacity-20 rounded transition"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Banner Alert (pour les alertes en haut de page)
export const BannerAlert = ({
  type = 'info',
  message,
  action,
  actionText,
  dismissible = true,
  onDismiss,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const types = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    warning: 'bg-yellow-500',
    info: 'bg-blue-600',
  };

  return (
    <div className={`${types[type]} text-white py-3 px-4`}>
      <div className="container mx-auto flex items-center justify-between gap-4">
        <p className="text-sm font-medium">{message}</p>
        
        <div className="flex items-center gap-3">
          {action && actionText && (
            <button
              onClick={action}
              className="text-sm font-semibold underline hover:no-underline"
            >
              {actionText}
            </button>
          )}
          
          {dismissible && (
            <button
              onClick={() => {
                setIsVisible(false);
                if (onDismiss) onDismiss();
              }}
              className="p-1 hover:bg-black hover:bg-opacity-20 rounded transition"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Inline Alert (pour les messages dans les formulaires)
export const InlineAlert = ({
  type = 'error',
  message,
  className = '',
}) => {
  const types = {
    success: {
      icon: CheckCircle,
      textColor: 'text-green-600',
    },
    error: {
      icon: AlertCircle,
      textColor: 'text-red-600',
    },
    warning: {
      icon: AlertTriangle,
      textColor: 'text-yellow-600',
    },
    info: {
      icon: Info,
      textColor: 'text-blue-600',
    },
  };

  const config = types[type];
  const Icon = config.icon;

  return (
    <div className={`flex items-center gap-2 ${config.textColor} ${className}`}>
      <Icon className="w-4 h-4 flex-shrink-0" />
      <p className="text-sm">{message}</p>
    </div>
  );
};

export default Alert;