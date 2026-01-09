import React from 'react';
import { ShoppingBag, Sprout, Check } from 'lucide-react';

const UserTypeSelector = ({ 
  selected = 'consommateur', 
  onChange,
  className = '' 
}) => {
  const userTypes = [
    {
      id: 'consommateur',
      title: 'Consommateur',
      description: 'J\'achète des produits agricoles locaux',
      icon: ShoppingBag,
      benefits: [
        'Accès à tous les produits',
        'Livraison à domicile',
        'Programme de fidélité',
      ],
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'producteur',
      title: 'Producteur',
      description: 'Je vends mes produits agricoles',
      icon: Sprout,
      benefits: [
        'Boutique en ligne',
        'Gestion des commandes',
        'Support dédié',
      ],
      color: 'from-green-500 to-green-600',
    },
  ];

  return (
    <div className={className}>
      <label className="block text-gray-700 font-bold text-lg mb-4">
        Je suis un(e) :
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {userTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selected === type.id;

          return (
            <button
              key={type.id}
              onClick={() => onChange(type.id)}
              className={`
                relative p-6 rounded-2xl border-2 transition-all duration-300 text-left
                ${isSelected
                  ? 'border-green-500 bg-green-50 shadow-lg scale-[1.02]'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }
              `}
            >
              {/* Selected Indicator */}
              {isSelected && (
                <div className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <Check className="w-5 h-5 text-white" />
                </div>
              )}

              {/* Icon */}
              <div className={`
                w-16 h-16 rounded-xl flex items-center justify-center mb-4
                bg-gradient-to-br ${type.color} ${isSelected ? 'shadow-lg' : ''}
              `}>
                <Icon className="w-8 h-8 text-white" />
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {type.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {type.description}
              </p>

              {/* Benefits */}
              <ul className="space-y-2">
                {type.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className={`
                      w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0
                      ${isSelected ? 'bg-green-100' : 'bg-gray-100'}
                    `}>
                      <div className={`
                        w-2 h-2 rounded-full
                        ${isSelected ? 'bg-green-600' : 'bg-gray-400'}
                      `}></div>
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Variante compacte (boutons simples)
export const CompactUserTypeSelector = ({ 
  selected = 'consommateur', 
  onChange,
  className = '' 
}) => {
  return (
    <div className={className}>
      <label className="block text-gray-700 font-semibold mb-3">
        Je suis un(e) :
      </label>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onChange('consommateur')}
          className={`
            py-3 px-4 rounded-xl font-semibold transition-all
            ${selected === 'consommateur'
              ? 'bg-green-600 text-white shadow-lg scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          Consommateur
        </button>
        <button
          onClick={() => onChange('producteur')}
          className={`
            py-3 px-4 rounded-xl font-semibold transition-all
            ${selected === 'producteur'
              ? 'bg-green-600 text-white shadow-lg scale-105'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          Producteur
        </button>
      </div>
    </div>
  );
};

export default UserTypeSelector;