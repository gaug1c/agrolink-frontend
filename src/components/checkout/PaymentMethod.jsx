import React from 'react';
import { CreditCard, Smartphone, Banknote, Shield } from 'lucide-react';
import Input from '../common/Input';

const PaymentMethod = ({ formData, errors, onChange }) => {
  const paymentMethods = [
    {
      id: 'card',
      name: 'Carte bancaire',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express',
      available: true,
    },
    {
      id: 'mobile',
      name: 'Mobile Money',
      icon: Smartphone,
      description: 'Airtel Money, MTN Mobile Money',
      available: true,
    },
    {
      id: 'cash',
      name: 'Paiement à la livraison',
      icon: Banknote,
      description: 'Espèces uniquement',
      available: true,
    },
  ];

  const formatCardNumber = (value) => {
    const numbers = value.replace(/\s/g, '');
    const formatted = numbers.match(/.{1,4}/g)?.join(' ') || numbers;
    return formatted;
  };

  const formatExpiry = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length >= 2) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`;
    }
    return numbers;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    onChange({ target: { name: 'cardNumber', value: formatted } });
  };

  const handleExpiryChange = (e) => {
    const formatted = formatExpiry(e.target.value);
    onChange({ target: { name: 'cardExpiry', value: formatted } });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Méthode de paiement
      </h2>

      {/* Payment Method Selection */}
      <div className="space-y-3 mb-6">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = formData.paymentMethod === method.id;

          return (
            <button
              key={method.id}
              onClick={() => onChange({ target: { name: 'paymentMethod', value: method.id } })}
              disabled={!method.available}
              className={`
                w-full p-4 rounded-xl border-2 transition-all text-left
                ${isSelected
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
                }
                ${!method.available && 'opacity-50 cursor-not-allowed'}
              `}
            >
              <div className="flex items-center gap-4">
                <div className={`
                  w-12 h-12 rounded-lg flex items-center justify-center
                  ${isSelected ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}
                `}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{method.name}</h3>
                  <p className="text-sm text-gray-600">{method.description}</p>
                </div>
                {isSelected && (
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">✓</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Card Payment Form */}
      {formData.paymentMethod === 'card' && (
        <div className="space-y-4 p-6 bg-gray-50 rounded-xl">
          <h3 className="font-bold text-gray-800 mb-4">Informations de la carte</h3>
          
          <Input
            label="Numéro de carte"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleCardNumberChange}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            error={errors.cardNumber}
            required
          />

          <Input
            label="Nom sur la carte"
            name="cardName"
            value={formData.cardName}
            onChange={onChange}
            placeholder="JEAN DUPONT"
            error={errors.cardName}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date d'expiration"
              name="cardExpiry"
              value={formData.cardExpiry}
              onChange={handleExpiryChange}
              placeholder="MM/AA"
              maxLength={5}
              error={errors.cardExpiry}
              required
            />
            <Input
              label="CVV"
              name="cardCVV"
              value={formData.cardCVV}
              onChange={onChange}
              placeholder="123"
              maxLength={3}
              type="password"
              error={errors.cardCVV}
              helperText="3 chiffres au dos"
              required
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 mt-4">
            <Shield className="w-5 h-5 text-green-600" />
            <span>Vos informations sont sécurisées et cryptées</span>
          </div>
        </div>
      )}

      {/* Mobile Money Form */}
      {formData.paymentMethod === 'mobile' && (
        <div className="space-y-4 p-6 bg-gray-50 rounded-xl">
          <h3 className="font-bold text-gray-800 mb-4">Informations Mobile Money</h3>
          
          <div>
            <label className="block text-gray-700 font-semibold mb-3">
              Opérateur
            </label>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={() => onChange({ target: { name: 'mobileOperator', value: 'airtel' } })}
                className={`
                  p-4 rounded-lg border-2 transition
                  ${formData.mobileOperator === 'airtel'
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                  }
                `}
              >
                <div className="font-bold text-red-600">Airtel Money</div>
              </button>
              <button
                onClick={() => onChange({ target: { name: 'mobileOperator', value: 'mtn' } })}
                className={`
                  p-4 rounded-lg border-2 transition
                  ${formData.mobileOperator === 'mtn'
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                  }
                `}
              >
                <div className="font-bold text-yellow-600">MTN Money</div>
              </button>
            </div>
          </div>

          <Input
            label="Numéro de téléphone"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={onChange}
            placeholder="+241 XX XX XX XX"
            type="tel"
            error={errors.mobileNumber}
            helperText="Vous recevrez une notification pour confirmer le paiement"
            required
          />

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
            <p className="text-sm text-blue-800">
              📱 Après validation de la commande, composez le code USSD affiché pour confirmer le paiement
            </p>
          </div>
        </div>
      )}

      {/* Cash Payment Info */}
      {formData.paymentMethod === 'cash' && (
        <div className="p-6 bg-gray-50 rounded-xl">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Banknote className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Paiement à la livraison</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Payez en espèces lors de la réception</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Préparez la monnaie exacte si possible</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Le livreur vous remettra un reçu</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-green-800">
            <p className="font-semibold mb-1">Paiement 100% sécurisé</p>
            <p>Toutes les transactions sont cryptées et sécurisées. Vos données ne sont jamais stockées sur nos serveurs.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;